<template>
  <v-card>
    <v-card-title class="headline grey darken-3 white--text">
      <span>
        <v-icon class="white--text">{{ formIcon }}</v-icon>
        {{ formTitle }}
      </span>
    </v-card-title>

    <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
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
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.salary_amount"
                :rules="validateItem.salaryAmountRules"
                label="Salary Amount"
                type="number"
                prepend-icon="money"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.allowance_amount"
                label="Allowance Amount"
                type="number"
                prepend-icon="money"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" type="submit" flat :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Index from "./Index";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Index
  },

  data: () => ({
    date_issued: false,
    defaultFormData: {
      salary_amount: null,
      allowance_amount: null,
      employee_id: null,
      date_issued: new Date().toISOString().substr(0, 10)
    },
    formType: "new",
    formData: {
      salary_amount: null,
      allowance_amount: null,
      employee_id: null,
      date_issued: new Date().toISOString().substr(0, 10)
    },
    valid: true,
    validateItem: {
      salaryAmountRules: [v => !!v || "Salary Amount is required"],
      allowanceAmountRules: [v => !!v || "Allowance Amount is required"],
      dateIssuedRules: [v => !!v || "Date Issued is required"]
    }
  }),

  computed: {
    ...mapGetters("employeeSalariesAndAllowances", [
      "getEmployeeSalariesAndAllowancesById"
    ]),
    ...mapState("employeeSalariesAndAllowances", ["employeeId"]),
    formTitle() {
      return this.formType === "new" ? "New" : "Edit";
    },
    formIcon() {
      return this.formType === "new" ? "add_box" : "edit";
    }
  },

  mounted() {
    this.getEmployeeSalariesAndAllowancesData();
  },

  created() {
    this.formData.employee_id = this.employeeId;
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("employeeSalariesAndAllowances", {
      getEmployeeSalariesAndAllowancesData: "getData",
      saveEmployeeSalariesAndAllowancesData: "saveData",
      updateEmployeeSalariesAndAllowancesData: "updateData",
      deleteEmployeeSalariesAndAllowancesData: "deleteData"
    }),

    editItem(id) {
      let data = this.getEmployeeSalariesAndAllowancesById(id);
      this.formData.id = data.id;
      this.formData.salary_amount = data.salary_amount;
      this.formData.allowance_amount = data.allowance_amount;
      this.formData.date_issued = data.date_issued;
      this.formData.is_current = data.is_current;
      this.formType = "update";
    },

    deleteItem(id) {
      this.deleteEmployeeSalariesAndAllowancesData(id)
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
    },

    close() {
      this.$emit("setDialog", false);
      this.formType = "new";
      setTimeout(() => {
        this.formData = Object.assign({}, this.defaultFormData);
        this.formData.employee_id = this.employeeId;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.formType === "new") {
          this.saveEmployeeSalariesAndAllowancesData(this.formData)
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
        } else if (this.formType === "update") {
          this.updateEmployeeSalariesAndAllowancesData(this.formData)
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
        }
        this.close();
      }
    }
  }
};
</script>