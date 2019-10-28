import axios from "axios";

const state = {
  withholdingTaxTableList: []
};

const getters = {
  getWithholdingTaxTableById: (state) => (id) => {
    return state.withholdingTaxTableList.find(withholdingTaxTable => withholdingTaxTable.id === id);
  },
  getWithholdingTaxTableList: (state) => {
    return state.withholdingTaxTableList;
  }
};

const actions = {
  getData({ dispatch, commit, state, rootState, getters, rootGetters }) {
    let url = `${process.env.VUE_APP_API_BACKEND}/withholdingTaxTable/`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        axios.get(url, header)
          .then(response => {
            commit("SET_DATA", response.data.result);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  getDataById({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/withholdingTaxTable/${payload}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(url, header)
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  saveData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/withholdingTaxTable/create`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          compensation_range_from: payload.compensation_range_from,
          compensation_range_to: payload.compensation_range_to,
          tax_amount: payload.tax_amount,
          tax_percentage: payload.tax_percentage,
          pay_frequency_id: payload.pay_frequency_id
        };

        axios
          .post(url, obj, header)
          .then(response => {
            commit("ADD_DATA", response.data.result);
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  updateData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/withholdingTaxTable/update/${payload.id}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          compensation_range_from: payload.compensation_range_from,
          compensation_range_to: payload.compensation_range_to,
          tax_amount: payload.tax_amount,
          tax_percentage: payload.tax_percentage,
          pay_frequency_id: payload.pay_frequency_id
        };

        axios
          .put(url, obj, header)
          .then(response => {
            commit("UPDATE_DATA", response.data.result);
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/withholdingTaxTable/delete/${payload}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(url, '', header)
          .then(response => {
            commit("DELETE_DATA", payload);
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
      state.withholdingTaxTableList = payload;
    } else {
      state.withholdingTaxTableList = [];
    }
  },
  ADD_DATA(state, payload) {
    state.withholdingTaxTableList.push(payload);
  },
  UPDATE_DATA(state, payload) {
    let index = state.withholdingTaxTableList.map(withholdingTaxTable => withholdingTaxTable.id).indexOf(payload.id);
    Object.assign(state.withholdingTaxTableList[index], {
      compensation_range_from: payload.compensation_range_from,
      compensation_range_to: payload.compensation_range_to,
      tax_amount: payload.tax_amount,
      tax_percentage: payload.tax_percentage,
      pay_frequency_id: payload.pay_frequency_id
    });
  },
  DELETE_DATA(state, payload) {
    let index = state.withholdingTaxTableList.map(withholdingTaxTable => withholdingTaxTable.id).indexOf(payload);
    state.withholdingTaxTableList.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
