const auth = require('./AuthController');
const employees = require('./EmployeesController');
const employeeSalariesAndAllowances = require('./EmployeeSalariesAndAllowancesController');
const payFrequencies = require('./PayFrequenciesController');
const roles = require('./RolesController');
const sssContributionTables = require('./SssContributionTablesController');
const users = require('./UsersController');
const withholdingTaxTables = require('./WithholdingTaxTablesController');

module.exports = {
    auth,
    employees,
    employeeSalariesAndAllowances,
    payFrequencies,
    roles,
    sssContributionTables,
    users,
    withholdingTaxTables
}