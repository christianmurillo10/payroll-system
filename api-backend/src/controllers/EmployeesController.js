const Model = require('../models');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /employee/create
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

    try {
      // Validators
      if (_.isEmpty(params.employee_no)) return res.json({ status: 200, message: "Employee No. is required.", result: false });
      if (_.isEmpty(params.firstname)) return res.json({ status: 200, message: "Firstname is required.", result: false });
      if (_.isEmpty(params.middlename)) return res.json({ status: 200, message: "Middlename is required.", result: false });
      if (_.isEmpty(params.lastname)) return res.json({ status: 200, message: "Lastname is required.", result: false });
      if (_.isEmpty(params.primary_address)) return res.json({ status: 200, message: "Primary Address is required.", result: false });
      if (_.isEmpty(params.email)) return res.json({ status: 200, message: "Email is required.", result: false });
      if (_.isEmpty(params.pay_frequency_id)) return res.json({ status: 200, message: "Pay Frequency is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });
      if (_.isEmpty(params.birthdate)) return res.json({ status: 200, message: "Birthdate is required.", result: false });
      if (_.isEmpty(params.date_start)) return res.json({ status: 200, message: "Date Start is required.", result: false });

      // Pre-setting variables
      criteria = { where: { employee_no: params.employee_no } };
      initialValues = _.pick(params, [
        'employee_no', 
        'firstname', 
        'middlename', 
        'lastname', 
        'primary_address', 
        'secondary_address', 
        'email', 
        'mobile', 
        'landline', 
        'tin_no', 
        'sss_no', 
        'philhealth_no', 
        'pagibig_no', 
        'pay_frequency_id', 
        'user_id', 
        'birthdate', 
        'date_start', 
        'date_endo'
      ]);

      // Execute findAll query
      data = await Model.Employees.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.Employees.create(initialValues);
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
   * @route PUT /employee/update/:id
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
        'employee_no', 
        'firstname', 
        'middlename', 
        'lastname', 
        'primary_address', 
        'secondary_address', 
        'email', 
        'mobile', 
        'landline', 
        'tin_no', 
        'sss_no', 
        'philhealth_no', 
        'pagibig_no', 
        'pay_frequency_id', 
        'user_id', 
        'birthdate', 
        'date_start', 
        'date_endo',
        'is_active'
      ]);
      // Execute findByPk query
      data = await Model.Employees.findByPk(req.params.id);
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
   * @route PUT /employee/delete/:id
   * @param req
   * @param res
   * @returns {never}
   */
  delete: async (req, res) => {
    let data;

    try {
      // Execute findByPk query
      data = await Model.Employees.findByPk(req.params.id);
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
   * @route POST /employee/search/
   * @param req
   * @param res
   * @returns {never}
   */
  search: async (req, res) => {
    const params = req.body;
    let query, data;

    if (_.isUndefined(params))
      return res.badRequest({ err: "Invalid Parameter: [params]" });
    if (_.isEmpty(params))
      return res.badRequest({ err: "Empty Parameter: [params]" });

    try {
      // Pre-setting variables
      query = `SELECT id, employee_no, firstname, middlename, lastname, primary_address, secondary_address, created_at, updated_at FROM employees WHERE (CONCAT(employee_no, firstname, middlename, lastname) LIKE ?) AND is_deleted = 0;`;
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
   * @route GET /employee
   * @param req
   * @param res
   * @returns {never}
   */
  findAll: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { where: { is_deleted: 0 }, include: [{ model: Model.PayFrequencies, as: 'payFrequencies' }, { model: Model.Users, as: 'users' }] };
      // Execute findAll query
      data = await Model.Employees.findAll(criteria);
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
   * @route GET /employee/:id
   * @param req
   * @param res
   * @returns {never}
   */
  findById: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { include: [{ model: Model.PayFrequencies, as: 'payFrequencies' }, { model: Model.Users, as: 'users' }] };
      // Execute findAll query
      data = await Model.Employees.findByPk(req.params.id, criteria);
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