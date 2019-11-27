const auth = require('./AuthController');
const employees = require('./EmployeesController');
const employeeSalariesAndAllowances = require('./EmployeeSalariesAndAllowancesController');
const payFrequencies = require('./PayFrequenciesController');
const payrolls = require('./PayrollsController');
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
    roles,
    sssContributionTables,
    users,
    withholdingTaxTables
}