import axios from "axios";

const state = {
  employeeId: null,
  employeeSalariesAndAllowancesEmployeeList: [],
  employeeSalariesAndAllowancesIsCurrentData: []
};

const getters = {
  getEmployeeSalariesAndAllowancesById: (state) => (id) => {
    return state.employeeSalariesAndAllowancesEmployeeList.find(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id === id);
  }
};

const actions = {
  getDataByEmployeeId({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/findAllbyEmployeeId/${payload}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(url, header)
          .then(response => {
            commit("SET_EMPLOYEE", payload);
            commit("SET_DATA_BY_EMPLOYEE", response.data.result);
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  getIsCurrentDataByEmployeeId({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    let url = `${process.env.VUE_APP_API_BACKEND}/employeeSalariesAndAllowances/findIsCurrentByEmployeeId/${payload}`;
    let header = { headers: { Token: localStorage.getItem("token") } };
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(url, header)
          .then(response => {
            commit("SET_EMPLOYEE", payload);
            commit("SET_IS_CURRENT_DATA_BY_EMPLOYEE", response.data.result[0]);
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
          date_issued: payload.date_issued
        };

        axios
          .post(url, obj, header)
          .then(response => {
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
          date_issued: payload.date_issued,
          is_current: payload.is_current
        };

        axios
          .put(url, obj, header)
          .then(response => {
            commit("UPDATE_DATA_BY_EMPLOYEE", response.data.result);
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
            commit("DELETE_DATA_BY_EMPLOYEE", payload);
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
};

const mutations = {
  SET_EMPLOYEE(state, payload) {
    if (payload) {
      state.employeeId = payload;
    } else {
      state.employeeId = null;
    }
  },
  SET_DATA_BY_EMPLOYEE(state, payload) {
    if (payload) {
      state.employeeSalariesAndAllowancesEmployeeList = payload;
    } else {
      state.employeeSalariesAndAllowancesEmployeeList = [];
    }
  },
  SET_IS_CURRENT_DATA_BY_EMPLOYEE(state, payload) {
    console.log(payload)
    if (payload) {
      state.employeeSalariesAndAllowancesIsCurrentData = payload;
    } else {
      state.employeeSalariesAndAllowancesIsCurrentData = [];
    }
  },
  ADD_DATA_BY_EMPLOYEE(state, payload) {
    state.employeeSalariesAndAllowancesEmployeeList.push(payload);
  },
  UPDATE_DATA_BY_EMPLOYEE(state, payload) {
    let index = state.employeeSalariesAndAllowancesEmployeeList.map(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id).indexOf(payload.id);
    Object.assign(state.employeeSalariesAndAllowancesEmployeeList[index], {
      salary_amount: payload.salary_amount,
      allowance_amount: payload.allowance_amount,
      employee_id: payload.employee_id,
      user_id: payload.user_id,
      date_issued: payload.date_issued,
      is_current: payload.is_current
    });
  },
  DELETE_DATA_BY_EMPLOYEE(state, payload) {
    let index = state.employeeSalariesAndAllowancesEmployeeList.map(employeeSalariesAndAllowances => employeeSalariesAndAllowances.id).indexOf(payload);
    state.employeeSalariesAndAllowancesEmployeeList.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
