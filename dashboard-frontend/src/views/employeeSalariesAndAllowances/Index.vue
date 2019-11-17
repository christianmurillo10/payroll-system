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
              <v-flex xs12 sm12 md12>
                <v-menu
                  ref="date_issued"
                  v-model="date_issued"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="formData.date_issued"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formData.date_issued"
                      label="Date Issued"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="formData.date_issued" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="date_issued = false">Cancel</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.date_issued.save(formData.date_issued)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
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
import Mixins from "@/helpers/Mixins.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Alerts
  },
  mixins: [Mixins],

  data: () => ({
    date_issued: false,
    defaultFormData: {
      employee_id: null,
      date_issued: new Date().toISOString().substr(0, 10)
    },
    formData: {
      employee_id: null,
      date_issued: new Date().toISOString().substr(0, 10)
    },
    valid: true,
    validateItem: {
      employeeRules: [v => !!v || "Employee is required"],
      dateIssuedRules: [v => !!v || "Date Issued is required"]
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

    submit() {
      if (this.$refs.form.validate()) {
          // this.saveEmployeeData(this.formData)
          //   .then(response => {
          //     let obj = {
          //       alert: true,
          //       type: "success",
          //       message: response.data.message
          //     };

          //     if (!response.data.result) obj.type = "error"
          //     this.setAlert(obj);
          //   })
          //   .catch(err => console.log(err));
        console.log("Submitted");
      }
    }
  }
};
</script>