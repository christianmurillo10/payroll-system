const Model = require('../models');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /employeeSalariesAndAllowances/create
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
      if (_.isEmpty(params.salary_amount)) return res.json({ status: 200, message: "Salary Amount is required.", result: false });
      if (_.isEmpty(params.allowance_amount)) return res.json({ status: 200, message: "Allowance Amount is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });
      if (_.isEmpty(params.date_issued)) return res.json({ status: 200, message: "Date Issued is required.", result: false });

      // Pre-setting variables
      criteria = { where: { date_issued: params.date_issued } };
      initialValues = _.pick(params, ['salary_amount', 'allowance_amount', 'employee_id', 'user_id', 'date_issued']);
      // Execute findAll query
      data = await Model.EmployeeSalariesAndAllowances.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.EmployeeSalariesAndAllowances.create(initialValues);
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
   * @route PUT /employeeSalariesAndAllowances/update/:id
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
      initialValues = _.pick(params, ['salary_amount', 'allowance_amount', 'employee_id', 'user_id', 'date_issued', 'is_current']);
      // Execute findByPk query
      data = await Model.EmployeeSalariesAndAllowances.findByPk(req.params.id);
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
   * @route PUT /employeeSalariesAndAllowances/delete/:id
   * @param req
   * @param res
   * @returns {never}
   */
  delete: async (req, res) => {
    let data;

    try {
      // Execute findByPk query
      data = await Model.EmployeeSalariesAndAllowances.findByPk(req.params.id);
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
   * @route GET /employeeSalariesAndAllowances/search/:value
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
      query = `SELECT id, salary_amount, allowance_amount, employee_id, user_id, date_issued, created_at, updated_at FROM employee_salaries_and_allowances WHERE (CONCAT(salary_amount, allowance_amount, date_issued) LIKE ?) AND is_deleted = 0;`;
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
   * @route GET /employeeSalariesAndAllowances
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
      data = await Model.EmployeeSalariesAndAllowances.findAll(criteria);
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
   * Find all by employee id
   * @route GET /employeeSalariesAndAllowances/findByEmployeeId/:employeeId
   * @param req
   * @param res
   * @returns {never}
   */
  findAllbyEmployeeId: async (req, res) => {
    const params = req.params;
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { where: { employee_id: params.employeeId, is_deleted: 0 }, include: [{ model: Model.Employees, as: 'employees' }, { model: Model.Users, as: 'users' }] };
      // Execute findAll query
      data = await Model.EmployeeSalariesAndAllowances.findAll(criteria);
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
   * @route GET /employeeSalariesAndAllowances/:id
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
      data = await Model.EmployeeSalariesAndAllowances.findByPk(req.params.id, criteria);
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