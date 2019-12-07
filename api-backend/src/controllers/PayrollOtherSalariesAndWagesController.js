const Model = require('../models');
const jsonfile = require('jsonfile');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /payrollOtherSalariesAndWages/create
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
      if (_.isEmpty(params.taxable_amount)) return res.json({ status: 200, message: "Taxable Amount is required.", result: false });
      if (_.isEmpty(params.non_taxable_amount)) return res.json({ status: 200, message: "Non Taxable Amount is required.", result: false });
      if (_.isEmpty(params.payroll_id)) return res.json({ status: 200, message: "Payroll is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });

      // Pre-setting variables
      criteria = { where: { payroll_id: params.payroll_id } };
      initialValues = _.pick(params, [
        'taxable_amount',
        'non_taxable_amount',
        'non_taxable_amount',
        'description',
        'employee_id',
        'user_id'
      ]);
      // Execute findAll query
      data = await Model.PayrollOtherSalariesAndWages.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.PayrollOtherSalariesAndWages.create(initialValues);
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
  }
};