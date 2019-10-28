const auth = require('./AuthController');
const employees = require('./EmployeesController');
const payFrequencies = require('./PayFrequenciesController');
const roles = require('./RolesController');
const sssContributionTables = require('./SssContributionTablesController');
const users = require('./UsersController');
const withholdingTaxTables = require('./WithholdingTaxTablesController');

module.exports = {
    auth,
    employees,
    payFrequencies,
    roles,
    sssContributionTables,
    users,
    withholdingTaxTables
}