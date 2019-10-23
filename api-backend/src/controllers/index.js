const auth = require('./AuthController');
const payFrequencies = require('./PayFrequenciesController');
const roles = require('./RolesController');
const sssContributionTables = require('./SssContributionTablesController');
const users = require('./UsersController');

module.exports = {
    auth,
    payFrequencies,
    roles,
    sssContributionTables,
    users
}