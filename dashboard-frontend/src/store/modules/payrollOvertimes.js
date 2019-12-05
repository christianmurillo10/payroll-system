import axios from "axios";

const state = {
  payrollOvertimesList: []
};

const getters = {
  getPayrollOvertimeById: (state) => (id) => {
    return state.payrollOvertimesList.find(payrollOvertime => payrollOvertime.id === id);
  },
  getPayrollOvertimeList: (state) => {
    return state.payrollOvertimesList;
  }
};

const actions = {
  computeData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/payrollOvertime/compute`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          basic: payload.basic,
          regular_day: payload.regular_day,
          special_day: payload.special_day,
          special_day_ford: payload.special_day_ford,
          holiday: payload.holiday,
          holiday_ford: payload.holiday_ford,
          double_holiday: payload.double_holiday,
          double_holiday_ford: payload.double_holiday_ford
        };

        axios
          .post(url, obj, header)
          .then(response => {
            // commit("ADD_DATA", response.data.result);
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
};

const mutations = {
  SET_DATA(state, payload) {
    if (payload) {
      state.payrollOvertimesList = payload;
    } else {
      state.payrollOvertimesList = [];
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
