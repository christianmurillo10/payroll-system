import axios from "axios";

const state = {
  payFrequencyList: []
};

const getters = {
  getPayFrequencyById: (state) => (id) => {
    return state.payFrequencyList.find(payFrequency => payFrequency.id === id);
  },
  getPayFrequencyNameById: (state) => (id) => {
    return state.payFrequencyList.find(payFrequency => payFrequency.id === id).name;
  },
  getPayFrequencyList: (state) => {
    return state.payFrequencyList;
  }
};

const actions = {
  getData({ dispatch, commit, state, rootState, getters, rootGetters }) {
    let url = `${process.env.VUE_APP_API_BACKEND}/payFrequency/`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/payFrequency/${payload}`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/payFrequency/create`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          name: payload.name,
          code: payload.code
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
    let url = `${process.env.VUE_APP_API_BACKEND}/payFrequency/update/${payload.id}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          name: payload.name,
          code: payload.code
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
    let url = `${process.env.VUE_APP_API_BACKEND}/payFrequency/delete/${payload}`;
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
      state.payFrequencyList = payload;
    } else {
      state.payFrequencyList = [];
    }
  },
  ADD_DATA(state, payload) {
    state.payFrequencyList.push(payload);
  },
  UPDATE_DATA(state, payload) {
    let index = state.payFrequencyList.map(payFrequency => payFrequency.id).indexOf(payload.id);
    Object.assign(state.payFrequencyList[index], {
      name: payload.name,
      code: payload.code
    });
  },
  DELETE_DATA(state, payload) {
    let index = state.payFrequencyList.map(payFrequency => payFrequency.id).indexOf(payload);
    state.payFrequencyList.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
