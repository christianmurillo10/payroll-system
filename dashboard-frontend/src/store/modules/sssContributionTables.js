import axios from "axios";

const state = {
  sssContributionTableList: []
};

const getters = {
  getSssContributionTableById: (state) => (id) => {
    return state.sssContributionTableList.find(sssContributionTable => sssContributionTable.id === id);
  },
  getSssContributionTableList: (state) => {
    return state.sssContributionTableList;
  }
};

const actions = {
  getData({ dispatch, commit, state, rootState, getters, rootGetters }) {
    let url = `${process.env.VUE_APP_API_BACKEND}/sssContributionTable/`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/sssContributionTable/${payload}`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/sssContributionTable/create`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          compensation_range_from: payload.compensation_range_from,
          compensation_range_to: payload.compensation_range_to,
          monthly_salary_credit: payload.monthly_salary_credit,
          employer_contribution: payload.employer_contribution,
          employee_contribution: payload.employee_contribution,
          total: payload.total
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
    let url = `${process.env.VUE_APP_API_BACKEND}/sssContributionTable/update/${payload.id}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          compensation_range_from: payload.compensation_range_from,
          compensation_range_to: payload.compensation_range_to,
          monthly_salary_credit: payload.monthly_salary_credit,
          employer_contribution: payload.employer_contribution,
          employee_contribution: payload.employee_contribution,
          total: payload.total
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
    let url = `${process.env.VUE_APP_API_BACKEND}/sssContributionTable/delete/${payload}`;
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
      state.sssContributionTableList = payload;
    } else {
      state.sssContributionTableList = [];
    }
  },
  ADD_DATA(state, payload) {
    state.sssContributionTableList.push(payload);
  },
  UPDATE_DATA(state, payload) {
    let index = state.sssContributionTableList.map(sssContributionTable => sssContributionTable.id).indexOf(payload.id);
    Object.assign(state.sssContributionTableList[index], {
      compensation_range_from: payload.compensation_range_from,
      compensation_range_to: payload.compensation_range_to,
      monthly_salary_credit: payload.monthly_salary_credit,
      employer_contribution: payload.employer_contribution,
      employee_contribution: payload.employee_contribution,
      total: payload.total
    });
  },
  DELETE_DATA(state, payload) {
    let index = state.sssContributionTableList.map(sssContributionTable => sssContributionTable.id).indexOf(payload);
    state.sssContributionTableList.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
