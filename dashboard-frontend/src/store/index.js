import Vue from "vue";
import Vuex from "vuex";

// Modules
import alerts from './modules/utilities/alerts'
import snackbars from './modules/utilities/snackbars'
import toolbar from './modules/toolbar'
import userAuthentication from './modules/userAuthentication'
import users from './modules/users'
import roles from './modules/roles'
import payFrequencies from './modules/payFrequencies'
import sssContributionTables from './modules/sssContributionTables'
import withholdingTaxTables from './modules/withholdingTaxTables'
import employees from './modules/employees'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    alerts,
    snackbars,
    toolbar,
    userAuthentication,
    users,
    roles,
    payFrequencies,
    sssContributionTables,
    withholdingTaxTables,
    employees
  }
});
