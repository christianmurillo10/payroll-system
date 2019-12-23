const Model = require('../models');
const SssContributionTablesController = require('../controllers/SssContributionTablesController');
const WithholdingTaxTablesController = require('../controllers/WithholdingTaxTablesController');
const payrollHelper = require('../helpers/payroll-helper');
const jsonfile = require('jsonfile');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /payrollDeduction/create
   */
  create: async (req, res) => {
    const params = req.body;
    let criteria, initialValues, data;

    // Validators
    if (_.isUndefined(params))
      return res.badRequest({ err: "Invalid Parameter: [params]" });
    if (_.isEmpty(params))
      return res.badRequest({ err: "Empty Parameter: [params]" });

    // Override variables
    params.created_at = moment().utc(8).format('YYYY-MM-DD HH:mm:ss');
    params.user_id = req.user.id.toLocaleString();
    params.employee_id = params.employee_id.toLocaleString();

    try {
      // Validators
      if (_.isEmpty(params.sss_payable_amount)) return res.json({ status: 200, message: "SSS PayableAmount is required.", result: false });
      if (_.isEmpty(params.sss_salary_amount)) return res.json({ status: 200, message: "SSS Salary Amount is required.", result: false });
      if (_.isEmpty(params.phic_payable_amount)) return res.json({ status: 200, message: "PHIC Payable Amount is required.", result: false });
      if (_.isEmpty(params.hdmf_payable_amount)) return res.json({ status: 200, message: "HDMF Payable Amount is required.", result: false });
      if (_.isEmpty(params.hdmf_salary_amount)) return res.json({ status: 200, message: "HDMF Salary Amount is required.", result: false });
      if (_.isEmpty(params.hdmf_housing_amount)) return res.json({ status: 200, message: "HDMF Housing Amount is required.", result: false });
      if (_.isEmpty(params.personal_cash_amount)) return res.json({ status: 200, message: "Personal Cash Amount is required.", result: false });
      if (_.isEmpty(params.with_tax_compensation_amount)) return res.json({ status: 200, message: "With Tax Compensation Amount is required.", result: false });
      if (_.isEmpty(params.total_deductions)) return res.json({ status: 200, message: "Total Deductions is required.", result: false });
      if (_.isEmpty(params.payroll_id)) return res.json({ status: 200, message: "Payroll is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });

      // Pre-setting variables
      criteria = { where: { payroll_id: params.payroll_id } };
      initialValues = _.pick(params, [
        'sss_payable_amount',
        'sss_salary_amount',
        'phic_payable_amount',
        'hdmf_payable_amount',
        'hdmf_salary_amount',
        'hdmf_housing_amount',
        'personal_cash_amount',
        'with_tax_compensation_amount',
        'total_deductions',
        'payroll_id',
        'employee_id',
        'user_id'
      ]);
      // Execute findAll query
      data = await Model.PayrollDeductions.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.PayrollDeductions.create(initialValues);
        res.json({
          status: 200,
          message: "Successfully created data.",
          result: _.omit(finalData.get({ plain: true }), ['is_deleted'])
        });
      } else {
        res.json({
          status: 200,
          message: "Date already exist.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed creating data."
      });
    }
  },

  /**
   * Compute
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @route POST /payrollDeduction/compute
   */
  compute: async (req, res) => {
    const params = req.body;

    try {
      let phicJson = 'src/json/phic.json';
      let hdmfJson = 'src/json/hdmf.json';
      let phicJsonData = await jsonfile.readFile(phicJson);
      let hdmfJsonData = await jsonfile.readFile(hdmfJson);
      let now = new Date();

      // contributions amount
      let sssContribution = await SssContributionTablesController.findContributionRange(params.basic);
      let taxContribution = await WithholdingTaxTablesController.findContributionRange(params.basic, params.payFrequency.id);
      let phicContribution = ((params.basic * phicJsonData.percentage) / 100).toFixed(2);
      let hdmfContribution = hdmfJsonData.filter(hdmf => hdmf.date == now.getFullYear());

      // compute by pay frequency
      // let computedSssContribution = await payrollHelper.computeByPayFrequency(sssContribution.employee_contribution, params.payFrequency.code);
      // let computedTaxContribution = await payrollHelper.computeByPayFrequency(taxContribution, params.payFrequency.code);
      // let computedPhicContribution = await payrollHelper.computeByPayFrequency(phicContribution, params.payFrequency.code);
      // let computedHdmfContribution = await payrollHelper.computeByPayFrequency(hdmfContribution, params.payFrequency.code);
      
      let finalResult = {
        sssContribution,
        taxContribution,
        phicContribution,
        hdmfContribution
      }

      res.json({
        status: 200,
        message: "Successfully computed data.",
        result: finalResult
      });
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed to find payroll deduction."
      });
    }
  },
};