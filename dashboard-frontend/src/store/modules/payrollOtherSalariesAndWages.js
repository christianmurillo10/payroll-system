import axios from "axios";

const state = {
  payrollOtherSalariesAndWagesList: []
};

const getters = {
  getPayrollOtherSalariesAndWagesById: (state) => (id) => {
    return state.payrollOtherSalariesAndWagesList.find(payrollOtherSalariesAndWages => payrollOtherSalariesAndWages.id === id);
  },
  getPayrollOtherSalariesAndWagesList: (state) => {
    return state.payrollOtherSalariesAndWagesList;
  }
};

const actions = {
//   computeData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
//     let url = `${process.env.VUE_APP_API_BACKEND}/payrollOtherSalariesAndWages/compute`;
//     let header = { headers: { Token: localStorage.getItem("token") } };
//     return new Promise((resolve, reject) => {
//       try {
//         let obj = {
//           basic: payload.basic,
//           undertime: payload.undertime,
//           half_day: payload.half_day,
//           sick_leave: payload.sick_leave,
//           vacation_leave: payload.vacation_leave,
//           holiday: payload.holiday,
//           absent: payload.absent
//         };

//         axios
//           .post(url, obj, header)
//           .then(response => {
//             // commit("ADD_DATA", response.data.result);
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
      state.payrollOtherSalariesAndWagesList = payload;
    } else {
      state.payrollOtherSalariesAndWagesList = [];
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
