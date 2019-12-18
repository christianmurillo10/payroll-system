import axios from "axios";

const state = {
  payrollDeductionList: []
};

const getters = {
  getPayrollDeductionById: (state) => (id) => {
    return state.payrollDeductionList.find(payrollDeduction => payrollDeduction.id === id);
  },
  getPayrollDeductionList: (state) => {
    return state.payrollDeductionList;
  }
};

const actions = {
  computeData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/payrollDeduction/compute`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          basic: payload.basic,
          pay_frequency_id: payload.pay_frequency_id
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
      state.payrollDeductionList = payload;
    } else {
      state.payrollDeductionList = [];
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
