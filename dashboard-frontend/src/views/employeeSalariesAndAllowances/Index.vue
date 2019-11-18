<template>
  <div>
    <Alerts />
    <v-flex xs12 sm6 md4 lg4>
      <v-toolbar color="#EEEEEE" dense>
        <v-toolbar-title>
          <v-icon class="black--text">view_list</v-icon>Employees - Salary and Allowances
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/employees" tag="button">
          <v-icon>arrow_back</v-icon>
        </router-link>
      </v-toolbar>
      <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
        <v-form ref="form" @submit.prevent="submit" v-model="valid" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-autocomplete
                  :items="getEmployeeList"
                  item-text="firstname"
                  item-value="id"
                  v-model="formData.employee_id"
                  :rules="validateItem.employeeRules"
                  label="Employee"
                  required
                  persistent-hint
                  prepend-icon="list"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" type="submit" flat :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import Alerts from "@/components/utilities/Alerts";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Alerts
  },

  data: () => ({
    date_issued: false,
    defaultFormData: {
      employee_id: null
    },
    formData: {
      employee_id: null
    },
    valid: true,
    validateItem: {
      employeeRules: [v => !!v || "Employee is required"]
    }
  }),

  computed: {
    ...mapGetters("employees", ["getEmployeeList"])
  },

  created() {
    this.getEmployeesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("employees", { getEmployeesData: "getData" }),
    ...mapActions("employeeSalariesAndAllowances", {getEmployeeSalariesAndAllowancesDataByEmployeeId: "getDataByEmployeeId"}),

    submit() {
      if (this.$refs.form.validate()) {
        this.getEmployeeSalariesAndAllowancesDataByEmployeeId(this.formData.employee_id)
          .then(response => {
            let obj = {
              alert: true,
              type: "success",
              message: response.data.message
            };

            if (!response.data.result) obj.type = "error";
            this.setAlert(obj);
          })
          .catch(err => console.log(err));
        console.log("Submitted");
      }
    }
  }
};
</script>