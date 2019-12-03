const Model = require('../models');
const jsonfile = require('jsonfile');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /payrollNightDifferential/create
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
      if (_.isEmpty(params.regular_day)) return res.json({ status: 200, message: "Regular Day is required.", result: false });
      if (_.isEmpty(params.special_day)) return res.json({ status: 200, message: "Special Day is required.", result: false });
      if (_.isEmpty(params.special_day_ford)) return res.json({ status: 200, message: "Special Day Falling on Rest Day is required.", result: false });
      if (_.isEmpty(params.holiday)) return res.json({ status: 200, message: "Holiday is required.", result: false });
      if (_.isEmpty(params.holiday_ford)) return res.json({ status: 200, message: "Holiday Falling on Rest Day is required.", result: false });
      if (_.isEmpty(params.double_holiday)) return res.json({ status: 200, message: "Double Holiday is required.", result: false });
      if (_.isEmpty(params.double_holiday_ford)) return res.json({ status: 200, message: "Double Holiday Falling on Rest Day is required.", result: false });
      if (_.isEmpty(params.regular_day_amount)) return res.json({ status: 200, message: "Regular Day Amount is required.", result: false });
      if (_.isEmpty(params.special_day_amount)) return res.json({ status: 200, message: "Special Day Amount is required.", result: false });
      if (_.isEmpty(params.special_day_ford_amount)) return res.json({ status: 200, message: "Special Day Falling on Rest Day Amount is required.", result: false });
      if (_.isEmpty(params.holiday_amount)) return res.json({ status: 200, message: "Holiday Amount is required.", result: false });
      if (_.isEmpty(params.holiday_ford_amount)) return res.json({ status: 200, message: "Holiday Falling on Rest Day Amount is required.", result: false });
      if (_.isEmpty(params.double_holiday_amount)) return res.json({ status: 200, message: "Double Holiday Amount is required.", result: false });
      if (_.isEmpty(params.double_holiday_ford_amount)) return res.json({ status: 200, message: "Double Holiday Falling on Rest Day Amount is required.", result: false });
      if (_.isEmpty(params.total_amount)) return res.json({ status: 200, message: "Total Amount is required.", result: false });
      if (_.isEmpty(params.payroll_id)) return res.json({ status: 200, message: "Payroll is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });

      // Pre-setting variables
      criteria = { where: { payroll_id: params.payroll_id } };
      initialValues = _.pick(params, [
        'regular_day',
        'special_day',
        'special_day_ford',
        'holiday',
        'holiday_ford',
        'double_holiday',
        'double_holiday_ford',
        'regular_day_amount',
        'special_day_amount',
        'special_day_ford_amount',
        'holiday_amount',
        'holiday_ford_amount',
        'double_holiday_amount',
        'double_holiday_ford_amount',
        'total_amount',
        'payroll_id',
        'employee_id',
        'user_id'
      ]);
      // Execute findAll query
      data = await Model.PayrollNightDifferentials.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.PayrollNightDifferentials.create(initialValues);
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
   * @routes POST /payrollNightDifferential/compute
   */
  compute: (req, res) => {
    let params = req.body;
    let file = 'src/json/payrollSettings.json';

    jsonfile.readFile(file, (err, data) => {
      let basic = params.basic;
      let regularDay = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.regular_day, data.workingDay.regularDay, data.nightDifferential.regularDay);
      let specialDay = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.special_day, data.workingDay.specialDay, data.nightDifferential.specialDay);
      let specialDayFord = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.special_day_ford, data.workingDay.specialDayFord, data.nightDifferential.specialDayFord);
      let holiday = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.holiday, data.workingDay.holiday, data.nightDifferential.holiday);
      let holidayFord = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.holiday_ford, data.workingDay.holidayFord, data.nightDifferential.holidayFord);
      let doubleHoliday = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.double_holiday, data.workingDay.doubleHoliday, data.nightDifferential.doubleHoliday);
      let doubleHolidayFord = computationTools(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.double_holiday_ford, data.workingDay.doubleHolidayFord, data.nightDifferential.doubleHolidayFord);
      let totalAmount = sum([regularDay, specialDay, specialDayFord, holiday, holidayFord, doubleHoliday, doubleHolidayFord]);
      let finalResult = {
        regularDay: regularDay.toFixed(2),
        specialDay: specialDay.toFixed(2),
        specialDayFord: specialDayFord.toFixed(2),
        holiday: holiday.toFixed(2),
        holidayFord: holidayFord.toFixed(2),
        doubleHoliday: doubleHoliday.toFixed(2),
        doubleHolidayFord: doubleHolidayFord.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      }

      res.json({
        status: 200,
        message: "Successfully computed data.",
        result: finalResult
      });
    });
  }
};

/**
 * Other Functions
 */

const computationTools = (basic, fixedWorkingDays, fixedWorkingHours, numberOfHours, percentage, nightPercentage) => {
  let finalComputation = 0.00;
  let hourlyRate = (basic / fixedWorkingDays / fixedWorkingHours) * percentage;
  finalComputation = (hourlyRate * nightPercentage) * numberOfHours;
  return finalComputation;
};

const sum = (input) => {
  if (toString.call(input) !== "[object Array]")
    return false;

  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
      continue;
    }
    total += Number(input[i]);
  }
  return total;
}