const Model = require('../models');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /payroll/create
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

    try {
      // Validators
      if (_.isEmpty(params.basic_salary_amount)) return res.json({ status: 200, message: "Basic Salary Amount. is required.", result: false });
      if (_.isEmpty(params.fixed_allowance_amount)) return res.json({ status: 200, message: "Fixed Allowance Amount is required.", result: false });
      if (_.isEmpty(params.daily_allowance_amount)) return res.json({ status: 200, message: "Daily Allowance Amount is required.", result: false });
      if (_.isEmpty(params.daily_rate_amount)) return res.json({ status: 200, message: "Daily Rate Amount is required.", result: false });
      if (_.isEmpty(params.total_working_day_amount)) return res.json({ status: 200, message: "Total Working Day Amount is required.", result: false });
      if (_.isEmpty(params.total_night_differential_amount)) return res.json({ status: 200, message: "Total Night Differential Amount is required.", result: false });
      if (_.isEmpty(params.total_overtime_amount)) return res.json({ status: 200, message: "Total Overtime Amount is required.", result: false });
      if (_.isEmpty(params.total_other_salary_and_wages_amount)) return res.json({ status: 200, message: "Total Other Salary and Wages Amount is required.", result: false });
      if (_.isEmpty(params.total_tardiness_amount)) return res.json({ status: 200, message: "Total Tardiness Amount is required.", result: false });
      if (_.isEmpty(params.gross_amount)) return res.json({ status: 200, message: "Gross Amount is required.", result: false });
      if (_.isEmpty(params.total_non_taxable_amount)) return res.json({ status: 200, message: "Total Non Taxable Amount is required.", result: false });
      if (_.isEmpty(params.total_deduction_amount)) return res.json({ status: 200, message: "Total Deduction Amount is required.", result: false });
      if (_.isEmpty(params.net_amount)) return res.json({ status: 200, message: "Net Amount is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });
      if (_.isEmpty(params.date)) return res.json({ status: 200, message: "Date is required.", result: false });
      if (_.isEmpty(params.date_from)) return res.json({ status: 200, message: "Date From is required.", result: false });
      if (_.isEmpty(params.date_to)) return res.json({ status: 200, message: "Date To is required.", result: false });

      // Pre-setting variables
      criteria = { where: { date_from: params.date_from } };
      initialValues = _.pick(params, [
        'basic_salary_amount', 
        'fixed_allowance_amount', 
        'daily_allowance_amount', 
        'daily_rate_amount', 
        'total_working_day_amount', 
        'total_night_differential_amount', 
        'total_overtime_amount', 
        'total_other_salary_and_wages_amount', 
        'total_tardiness_amount', 
        'gross_amount', 
        'total_non_taxable_amount', 
        'total_deduction_amount', 
        'net_amount', 
        'employee_id', 
        'user_id', 
        'date', 
        'date_from', 
        'date_to'
      ]);

      // Execute findAll query
      data = await Model.Payrolls.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.Payrolls.create(initialValues);
        res.json({
          status: 200,
          message: "Successfully created data.",
          result: _.omit(finalData.get({ plain: true }), ['is_deleted'])
        });
      } else {
        res.json({
          status: 200,
          message: "Data already exist.",
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
   * Update
   * @route PUT /payroll/update/:id
   * @param req
   * @param res
   * @returns {never}
   */
  update: async (req, res) => {
    const params = req.body;
    let initialValues, data;

    if (_.isUndefined(params))
      return res.badRequest({ err: "Invalid Parameter: [params]" });
    if (_.isEmpty(params))
      return res.badRequest({ err: "Empty Parameter: [params]" });

    try {
      // Pre-setting variables
      initialValues = _.pick(params, [
        'basic_salary_amount', 
        'fixed_allowance_amount', 
        'daily_allowance_amount', 
        'daily_rate_amount', 
        'total_working_day_amount', 
        'total_night_differential_amount', 
        'total_overtime_amount', 
        'total_other_salary_and_wages_amount', 
        'total_tardiness_amount', 
        'gross_amount', 
        'total_non_taxable_amount', 
        'total_deduction_amount', 
        'net_amount', 
        'employee_id', 
        'user_id', 
        'date', 
        'date_from', 
        'date_to'
      ]);
      // Execute findByPk query
      data = await Model.Payrolls.findByPk(req.params.id);
      if (!_.isEmpty(data)) {
        let finalData = await data.update(initialValues);
        res.json({
          status: 200,
          message: "Successfully updated data.",
          result: finalData
        });
      } else {
        res.json({
          status: 200,
          message: "Data doesn't exist.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed updating data."
      });
    }
  },

  /**
   * Delete
   * @route PUT /payroll/delete/:id
   * @param req
   * @param res
   * @returns {never}
   */
  delete: async (req, res) => {
    let data;

    try {
      // Execute findByPk query
      data = await Model.Payrolls.findByPk(req.params.id);
      if (!_.isEmpty(data)) {
        let finalData = await data.update({ is_deleted: 1 });
        res.json({
          status: 200,
          message: "Successfully deleted data.",
          result: finalData
        });
      } else {
        res.json({
          status: 200,
          message: "Data doesn't exist.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed deleting data."
      });
    }
  },

  /**
   * Search
   * @route POST /payroll/search/:value
   * @param req
   * @param res
   * @returns {never}
   */
  search: async (req, res) => {
    const params = req.params;
    let query, data;

    if (_.isUndefined(params))
      return res.badRequest({ err: "Invalid Parameter: [params]" });
    if (_.isEmpty(params))
      return res.badRequest({ err: "Empty Parameter: [params]" });

    try {
      // Pre-setting variables
      query = `SELECT 
                basic_salary_amount, 
                fixed_allowance_amount, 
                daily_allowance_amount, 
                daily_rate_amount, 
                total_working_day_amount, 
                total_night_differential_amount, 
                total_overtime_amount, 
                total_other_salary_and_wages_amount, 
                total_tardiness_amount, 
                gross_amount, 
                total_non_taxable_amount, 
                total_deduction_amount, 
                net_amount, 
                employee_id, 
                user_id, 
                date, 
                date_from, 
                date_to
            FROM employees 
            WHERE date_from = ? AND is_deleted = 0;`;
      // Execute native query
      data = await Model.sequelize.query(query, {
        replacements: [`%${params.value}%`],
        type: Model.sequelize.QueryTypes.SELECT
      });
      if (!_.isEmpty(data)) {
        res.json({
          status: 200,
          message: "Successfully searched data.",
          result: data
        });
      } else {
        res.json({
          status: 200,
          message: "No Data Found.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed to search data."
      });
    }
  },

  /**
   * Find all
   * @route GET /payroll
   * @param req
   * @param res
   * @returns {never}
   */
  findAll: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { where: { is_deleted: 0 }, include: [{ model: Model.Employees, as: 'employees' }, { model: Model.Users, as: 'users' }] };
      // Execute findAll query
      data = await Model.Payrolls.findAll(criteria);
      if (!_.isEmpty(data[0])) {
        res.json({
          status: 200,
          message: "Successfully find all data.",
          result: data
        });
      } else {
        res.json({
          status: 200,
          message: "No Data Found.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed to find all data."
      });
    }
  },

  /**
   * Find by id
   * @route GET /payroll/:id
   * @param req
   * @param res
   * @returns {never}
   */
  findById: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { include: [{ model: Model.Employees, as: 'employees' }, { model: Model.Users, as: 'users' }] };
      // Execute findAll query
      data = await Model.Payrolls.findByPk(req.params.id, criteria);
      if (!_.isEmpty(data)) {
        res.json({
          status: 200,
          message: "Successfully find data.",
          result: _.omit(data.get({ plain: true }), ['is_deleted'])
        });
      } else {
        res.json({
          status: 200,
          message: "No Data Found.",
          result: false
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        err: err,
        message: "Failed to find data."
      });
    }
  },
};