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
import payrolls from './modules/payrolls'
import payrollWorkingDays from './modules/payrollWorkingDays'
import payrollNightDifferentials from './modules/payrollNightDifferentials'
import payrollOvertimes from './modules/payrollOvertimes'
import payrollTardiness from './modules/payrollTardiness'
import sssContributionTables from './modules/sssContributionTables'
import withholdingTaxTables from './modules/withholdingTaxTables'
import employees from './modules/employees'
import employeeSalariesAndAllowances from './modules/employeeSalariesAndAllowances'

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
    payrolls,
    payrollWorkingDays,
    payrollNightDifferentials,
    payrollOvertimes,
    payrollTardiness,
    sssContributionTables,
    withholdingTaxTables,
    employees,
    employeeSalariesAndAllowances
  }
});
