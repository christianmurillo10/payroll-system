const auth = require('./AuthController');
const employees = require('./EmployeesController');
const employeeSalariesAndAllowances = require('./EmployeeSalariesAndAllowancesController');
const payFrequencies = require('./PayFrequenciesController');
const payrolls = require('./PayrollsController');
const payrollWorkingDays = require('./PayrollWorkingDaysController');
const payrollNightDifferentials = require('./PayrollNightDifferentialsController');
const payrollOvertimes = require('./PayrollOvertimesController');
const payrollTardiness = require('./PayrollTardinessController');
const payrollOtherSalariesAndWages = require('./PayrollOtherSalariesAndWagesController');
const roles = require('./RolesController');
const sssContributionTables = require('./SssContributionTablesController');
const users = require('./UsersController');
const withholdingTaxTables = require('./WithholdingTaxTablesController');

module.exports = {
    auth,
    employees,
    employeeSalariesAndAllowances,
    payFrequencies,
    payrolls,
    payrollWorkingDays,
    payrollNightDifferentials,
    payrollOvertimes,
    payrollTardiness,
    payrollOtherSalariesAndWages,
    roles,
    sssContributionTables,
    users,
    withholdingTaxTables
}