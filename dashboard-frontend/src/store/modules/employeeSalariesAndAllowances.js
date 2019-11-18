import axios from "axios";

const state = {
  employeeSalariesAndAllowancesList: []
};

const getters = {
  getEmployeeById: (state) => (id) => {
    return state.employeeSalariesAndAllowancesList.find(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id === id);
  },
  getEmployeeSalariesAndAllowancesList: (state) => {
    return state.employeeSalariesAndAllowancesList;
  }
};

const actions = {
  getData({ dispatch, commit, state, rootState, getters, rootGetters }) {
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/${payload}`;
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
  getDataByEmployeeId({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/findAllbyEmployeeId/${payload}`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/create`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          salary_amount: payload.salary_amount,
          allowance_amount: payload.allowance_amount,
          employee_id: payload.employee_id,
          user_id: payload.user_id,
          date_issued: payload.date_issued
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
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/update/${payload.id}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          salary_amount: payload.salary_amount,
          allowance_amount: payload.allowance_amount,
          employee_id: payload.employee_id,
          user_id: payload.user_id,
          date_issued: payload.date_issued,
          is_current: payload.is_current
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
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/delete/${payload}`;
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
      state.employeeSalariesAndAllowancesList = payload;
    } else {
      state.employeeSalariesAndAllowancesList = [];
    }
  },
  ADD_DATA(state, payload) {
    state.employeeSalariesAndAllowancesList.push(payload);
  },
  UPDATE_DATA(state, payload) {
    let index = state.employeeSalariesAndAllowancesList.map(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id).indexOf(payload.id);
    Object.assign(state.employeeSalariesAndAllowancesList[index], {
      salary_amount: payload.salary_amount,
      allowance_amount: payload.allowance_amount,
      employee_id: payload.employee_id,
      user_id: payload.user_id,
      date_issued: payload.date_issued,
      is_current: payload.is_current
    });
  },
  DELETE_DATA(state, payload) {
    let index = state.employeeSalariesAndAllowancesList.map(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id).indexOf(payload);
    state.employeeSalariesAndAllowancesList.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
