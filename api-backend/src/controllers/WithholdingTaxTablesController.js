const Model = require('../models');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /withholdingTaxTable/create
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
      if (_.isEmpty(params.tax_amount)) return res.json({ status: 200, message: "Tax Amount is required.", result: false });
      if (_.isEmpty(params.tax_percentage)) return res.json({ status: 200, message: "Tax Percentage is required.", result: false });
      if (_.isEmpty(params.pay_frequency_id)) return res.json({ status: 200, message: "Pay Frequency is required.", result: false });

      // Pre-setting variables
      criteria = { where: { compensation_range_from: params.compensation_range_from } };
      initialValues = _.pick(params, ['compensation_range_from', 'compensation_range_to', 'tax_amount', 'tax_percentage', 'pay_frequency_id', 'created_at']);
      // Execute findAll query
      data = await Model.WithholdingTaxTables.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let withholdingTax = await Model.WithholdingTaxTables.create(initialValues);
        res.json({
          status: 200,
          message: "Successfully created data.",
          result: _.omit(withholdingTax.get({ plain: true }), ['is_deleted'])
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
   * @route PUT /withholdingTaxTable/update/:id
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
      initialValues = _.pick(params, ['compensation_range_from', 'compensation_range_to', 'tax_amount', 'tax_percentage', 'pay_frequency_id']);
      // Execute findByPk query
      data = await Model.WithholdingTaxTables.findByPk(req.params.id);
      if (!_.isEmpty(data)) {
        let withholdingTax = await data.update(initialValues);
        res.json({
          status: 200,
          message: "Successfully updated data.",
          result: withholdingTax
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
   * @route PUT /withholdingTaxTable/delete/:id
   * @param req
   * @param res
   * @returns {never}
   */
  delete: async (req, res) => {
    let data;

    try {
      // Execute findByPk query
      data = await Model.WithholdingTaxTables.findByPk(req.params.id);
      if (!_.isEmpty(data)) {
        let withholdingTax = await data.update({ is_deleted: 1 });
        res.json({
          status: 200,
          message: "Successfully deleted data.",
          result: withholdingTax
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
   * @route POST /withholdingTaxTable/search/
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
      query = `SELECT id, compensation_range_from, compensation_range_to, tax_amount, tax_percentage, pay_frequency_id, created_at, updated_at FROM withholding_tax_tables WHERE compensation_range_from LIKE ? AND compensation_range_to LIKE ? AND is_deleted = 0;`;
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
   * @route GET /withholdingTaxTable
   * @param req
   * @param res
   * @returns {never}
   */
  findAll: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { where: { is_deleted: 0 }, include: [{ model: Model.PayFrequencies, as: 'payFrequencies' }] };
      // Execute findAll query
      data = await Model.WithholdingTaxTables.findAll(criteria);
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
   * @route GET /withholdingTaxTable/:id
   * @param req
   * @param res
   * @returns {never}
   */
  findById: async (req, res) => {
    let data, criteria;

    try {
      // Pre-setting variables
      criteria = { include: [{ model: Model.PayFrequencies, as: 'payFrequencies' }] };
      // Execute findAll query
      data = await Model.WithholdingTaxTables.findByPk(req.params.id, criteria);
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