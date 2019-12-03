const Model = require('../models');
const jsonfile = require('jsonfile');

module.exports = {
  /**
   * Create
   * @param req
   * @param res
   * @returns {Promise<void>}
   * @routes POST /payrollTardiness/create
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
      if (_.isEmpty(params.undertime)) return res.json({ status: 200, message: "Undertime is required.", result: false });
      if (_.isEmpty(params.half_day)) return res.json({ status: 200, message: "Half Day is required.", result: false });
      if (_.isEmpty(params.sick_leave)) return res.json({ status: 200, message: "Sick Leave is required.", result: false });
      if (_.isEmpty(params.vacation_leave)) return res.json({ status: 200, message: "Vacation Leave is required.", result: false });
      if (_.isEmpty(params.holiday)) return res.json({ status: 200, message: "Holiday is required.", result: false });
      if (_.isEmpty(params.absent)) return res.json({ status: 200, message: "Absent is required.", result: false });
      if (_.isEmpty(params.total_absent)) return res.json({ status: 200, message: "Total Absent is required.", result: false });
      if (_.isEmpty(params.undertime_amount)) return res.json({ status: 200, message: "Undertime Amount is required.", result: false });
      if (_.isEmpty(params.half_day_amount)) return res.json({ status: 200, message: "Half Day Amount is required.", result: false });
      if (_.isEmpty(params.sick_leave_amount)) return res.json({ status: 200, message: "Sick Leave Amount is required.", result: false });
      if (_.isEmpty(params.vacation_leave_amount)) return res.json({ status: 200, message: "Vacation Leave Amount is required.", result: false });
      if (_.isEmpty(params.holiday_amount)) return res.json({ status: 200, message: "Holiday Amount is required.", result: false });
      if (_.isEmpty(params.absent_amount)) return res.json({ status: 200, message: "Absent Amount is required.", result: false });
      if (_.isEmpty(params.total_absent_amount)) return res.json({ status: 200, message: "Total Absent Amount is required.", result: false });
      if (_.isEmpty(params.total_amount)) return res.json({ status: 200, message: "Total Amount is required.", result: false });
      if (_.isEmpty(params.payroll_id)) return res.json({ status: 200, message: "Payroll is required.", result: false });
      if (_.isEmpty(params.employee_id)) return res.json({ status: 200, message: "Employee is required.", result: false });
      if (_.isEmpty(params.user_id)) return res.json({ status: 200, message: "Created By is required.", result: false });

      // Pre-setting variables
      criteria = { where: { payroll_id: params.payroll_id } };
      initialValues = _.pick(params, [
        'undertime',
        'half_day',
        'sick_leave',
        'vacation_leave',
        'holiday',
        'absent',
        'total_absent',
        'undertime_amount',
        'half_day_amount',
        'sick_leave_amount',
        'vacation_leave_amount',
        'holiday_amount',
        'absent_amount',
        'total_absent_amount',
        'total_amount',
        'payroll_id',
        'employee_id',
        'user_id'
      ]);
      // Execute findAll query
      data = await Model.PayrollTardiness.findAll(criteria);
      if (_.isEmpty(data[0])) {
        let finalData = await Model.PayrollTardiness.create(initialValues);
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
   * @routes POST /payrollTardiness/compute
   */
  compute: (req, res) => {
    let params = req.body;
    let file = 'src/json/payrollSettings.json';

    jsonfile.readFile(file, (err, data) => {
      let basic = params.basic;
      let undertime = computationPerHour(basic, data.fixedWorkingDays, data.fixedWorkingHours, params.undertime);
      let halfDay = computationHalfDay(basic, data.fixedWorkingDays, params.half_day);
      let sickLeave = computationPerDay(basic, data.fixedWorkingDays, params.sick_leave);
      let vacationLeave = computationPerDay(basic, data.fixedWorkingDays, params.vacation_leave);
      let holiday = computationPerDay(basic, data.fixedWorkingDays, params.holiday);
      let absent = computationPerDay(basic, data.fixedWorkingDays, params.absent);
      let totalAbsentAmount = sum([sickLeave, vacationLeave, holiday, absent]);
      let totalAmount = sum([undertime, halfDay, sickLeave, vacationLeave, holiday, absent]);
      let finalResult = {
        undertime: undertime.toFixed(2),
        halfDay: halfDay.toFixed(2),
        sickLeave: sickLeave.toFixed(2),
        vacationLeave: vacationLeave.toFixed(2),
        holiday: holiday.toFixed(2),
        absent: absent.toFixed(2),
        totalAbsentAmount: totalAbsentAmount.toFixed(2),
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

const computationPerHour = (basic, fixedWorkingDays, fixedWorkingHours, numberOfHours) => {
  let finalComputation = 0.00;
  let hourlyRate = (basic / fixedWorkingDays / fixedWorkingHours);
  finalComputation = hourlyRate * numberOfHours;
  return finalComputation;
};

const computationHalfDay = (basic, fixedWorkingDays, numberOfDays) => {
  let finalComputation = 0.00;
  let dailyRate = (basic / fixedWorkingDays);
  finalComputation = (dailyRate * numberOfDays) / 2;
  return finalComputation;
};

const computationPerDay = (basic, fixedWorkingDays, numberOfDays) => {
  let finalComputation = 0.00;
  let dailyRate = (basic / fixedWorkingDays);
  finalComputation = dailyRate * numberOfDays;
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