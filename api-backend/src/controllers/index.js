const auth = require('./AuthController');
const payFrequencies = require('./PayFrequenciesController');
const roles = require('./RolesController');
const users = require('./UsersController');

module.exports = {
    auth,
    payFrequencies,
    roles,
    users
}