const Model = require('../models');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /sssContributionTable/create
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
      if (_.isEmpty(params.compensation_range_from)) return res.json({ status: 200, message: "Compensation Range From is required.", result: false });
      if (_.isEmpty(params.compensation_range_to)) return res.json({ status: 200, message: "Compensation Range To is required.", result: false });
      if (_.isEmpty(params.monthly_salary_credit)) return res.json({ status: 200, message: "Monthly Salary Credit is required.", result: false });
      if (_.isEmpty(params.employer_contribution)) return res.json({ status: 200, message: "Employer Contribution is required.", result: false });
      if (_.isEmpty(params.employee_contribution)) return res.json({ status: 200, message: "Employee Contribution is required.", result: false });
      if (_.isEmpty(params.total)) return res.json({ status: 200, message: "Total is required.", result: false });

      // Pre-setting variables
      criteria = { where: { monthly_salary_credit: params.monthly_salary_credit } };
      initialValues = _.pick(params, ['compensation_range_from', 'compensation_range_to', 'monthly_salary_credit', 'employer_contribution', 'employee_contribution', 'total', 'created_at']);
      // Execute findAll query
      data = await Model.SssContributionTables.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.SssContributionTables.create(initialValues);
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
   * @route PUT /sssContributionTable/update/:id
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
      initialValues = _.pick(params, ['compensation_range_from', 'compensation_range_to', 'monthly_salary_credit', 'employer_contribution', 'employee_contribution', 'total']);
      // Execute findByPk query
      data = await Model.SssContributionTables.findByPk(req.params.id);
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
   * @route PUT /sssContributionTable/delete/:id
   * @param req
   * @param res
   * @returns {never}
   */
  delete: async (req, res) => {
    let data;

    try {
      // Execute findByPk query
      data = await Model.SssContributionTables.findByPk(req.params.id);
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
   * @route GET /sssContributionTable/search/:value
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
      query = `SELECT id, compensation_range_from, compensation_range_to, monthly_salary_credit, employer_contribution, employee_contribution, total, created_at, updated_at FROM sss_contribution_tables WHERE compensation_range_from LIKE ? AND compensation_range_to LIKE ? AND is_deleted = 0;`;
      // Execute native query
      data = await Model.sequelize.query(query, {
        replacements: [`%${params.value}%`, `%${params.value}%`],
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
   * @route GET /sssContributionTable
   * @param req
   * @param res
   * @returns {never}
   */
  findAll: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { where: { is_deleted: 0 } };
      // Execute findAll query
      data = await Model.SssContributionTables.findAll(criteria);
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
   * @route GET /sssContributionTable/:id
   * @param req
   * @param res
   * @returns {never}
   */
  findById: async (req, res) => {
    let data;

    try {
      // Execute findAll query
      data = await Model.SssContributionTables.findByPk(req.params.id);
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

  /**
   * Find Contribution Range
   * @route GET /sssContributionTable/:id
   * @param req
   * @param res
   * @returns {never}
   */
  findContributionRange: async (req, res) => {
    const params = req.params;
    let query, data;

    if (_.isUndefined(params))
      return res.badRequest({ err: "Invalid Parameter: [params]" });
    if (_.isEmpty(params))
      return res.badRequest({ err: "Empty Parameter: [params]" });

    try {
      // Pre-setting variables
      query = `SELECT * FROM sss_contribution_tables WHERE ? BETWEEN compensation_range_from AND compensation_range_to AND is_deleted = 0;`;
      // Execute native query
      data = await Model.sequelize.query(query, {
        replacements: [params.value],
        type: Model.sequelize.QueryTypes.SELECT
      });
      if (!_.isEmpty(data)) {
        res.json({
          status: 200,
          message: "Successfully find contribution range.",
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
        message: "Failed to find contribution range."
      });
    }
  },
};