import axios from "axios";

const state = {
  payrollList: []
};

const getters = {
  getPayrollById: (state) => (id) => {
    return state.payrollList.find(payroll => payroll.id === id);
  },
  getPayrollList: (state) => {
    return state.payrollList;
  }
};

const actions = {
  getData({ dispatch, commit, state, rootState, getters, rootGetters }) {
    let url = `${process.env.VUE_APP_API_BACKEND}/payroll/`;
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
    let url = `${process.env.VUE_APP_API_BACKEND}/payroll/${payload}`;
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
//   saveData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
//     let url = `${process.env.VUE_APP_API_BACKEND}/employee/create`;
//     let header = { headers: { Token: localStorage.getItem("token") } };
//     return new Promise((resolve, reject) => {
//       try {
//         let obj = {
//           employee_no: payload.employee_no,
//           firstname: payload.firstname,
//           middlename: payload.middlename,
//           lastname: payload.lastname,
//           primary_address: payload.primary_address,
//           secondary_address: payload.secondary_address,
//           email: payload.email,
//           mobile: payload.mobile,
//           landline: payload.landline,
//           tin_no: payload.tin_no,
//           sss_no: payload.sss_no,
//           philhealth_no: payload.philhealth_no,
//           pagibig_no: payload.pagibig_no,
//           pay_frequency_id: payload.pay_frequency_id.toLocaleString(),
//           birthdate: payload.birthdate,
//           date_start: payload.date_start
//         };

//         axios
//           .post(url, obj, header)
//           .then(response => {
//             commit("ADD_DATA", response.data.result);
//             resolve(response);
//           });
//       } catch (err) {
//         reject(err);
//       }
//     });
//   },
//   updateData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
//     let url = `${process.env.VUE_APP_API_BACKEND}/employee/update/${payload.id}`;
//     let header = { headers: { Token: localStorage.getItem("token") } };
//     return new Promise((resolve, reject) => {
//       try {
//         let obj = {
//           employee_no: payload.employee_no,
//           firstname: payload.firstname,
//           middlename: payload.middlename,
//           lastname: payload.lastname,
//           primary_address: payload.primary_address,
//           secondary_address: payload.secondary_address,
//           email: payload.email,
//           mobile: payload.mobile,
//           landline: payload.landline,
//           tin_no: payload.tin_no,
//           sss_no: payload.sss_no,
//           philhealth_no: payload.philhealth_no,
//           pagibig_no: payload.pagibig_no,
//           pay_frequency_id: payload.pay_frequency_id,
//           birthdate: payload.birthdate,
//           date_start: payload.date_start
//         };

//         axios
//           .put(url, obj, header)
//           .then(response => {
//             commit("UPDATE_DATA", response.data.result);
//             resolve(response);
//           });
//       } catch (err) {
//         reject(err);
//       }
//     });
//   },
//   deleteData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
//     let url = `${process.env.VUE_APP_API_BACKEND}/employee/delete/${payload}`;
//     let header = { headers: { Token: localStorage.getItem("token") } };
//     return new Promise((resolve, reject) => {
//       try {
//         axios
//           .put(url, '', header)
//           .then(response => {
//             commit("DELETE_DATA", payload);
//             resolve(response);
//           });
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
};

const mutations = {
  SET_DATA(state, payload) {
    if (payload) {
      state.payrollList = payload;
    } else {
      state.payrollList = [];
    }
  },
//   ADD_DATA(state, payload) {
//     state.employeeList.push(payload);
//   },
//   UPDATE_DATA(state, payload) {
//     let index = state.employeeList.map(employee => employee.id).indexOf(payload.id);
//     Object.assign(state.employeeList[index], {
//       employee_no: payload.employee_no,
//       firstname: payload.firstname,
//       middlename: payload.middlename,
//       lastname: payload.lastname,
//       primary_address: payload.primary_address,
//       secondary_address: payload.secondary_address,
//       email: payload.email,
//       mobile: payload.mobile,
//       landline: payload.landline,
//       tin_no: payload.tin_no,
//       sss_no: payload.sss_no,
//       philhealth_no: payload.philhealth_no,
//       pagibig_no: payload.pagibig_no,
//       pay_frequency_id: payload.pay_frequency_id,
//       user_id: payload.user_id,
//       birthdate: payload.birthdate,
//       date_start: payload.date_start
//     });
//   },
//   DELETE_DATA(state, payload) {
//     let index = state.employeeList.map(employee => employee.id).indexOf(payload);
//     state.employeeList.splice(index, 1);
//   }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
