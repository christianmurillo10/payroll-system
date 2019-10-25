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
              <v-text-field
                v-model="formData.compensation_range_from"
                :rules="validateItem.compensationRangeFromRules"
                label="Compensation Range From"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.compensation_range_to"
                :rules="validateItem.compensationRangeToRules"
                label="Compensation Range To"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.monthly_salary_credit"
                :rules="validateItem.monthlySalaryCreditRules"
                label="Monthly Salary Credit"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.employer_contribution"
                :rules="validateItem.employerContributionRules"
                label="Employer Contribution"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.employee_contribution"
                :rules="validateItem.employeeContributionRules"
                label="Employee Contribution"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.total"
                :rules="validateItem.totalRules"
                label="Total"
                required
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Index
  },

  data: () => ({
    defaultFormData: {
      compensation_range_from: "",
      compensation_range_to: "",
      monthly_salary_credit: "",
      employer_contribution: "",
      descremployee_contributioniption: "",
      total: ""
    },
    formType: "new",
    formData: {
      compensation_range_from: "",
      compensation_range_to: "",
      monthly_salary_credit: "",
      employer_contribution: "",
      descremployee_contributioniption: "",
      total: ""
    },
    valid: true,
    validateItem: {
      compensationRangeFromRules: [
        v => !!v || "Compensation Range From is required",
        v => (v && v.length <= 50) || "Compensation Range From must be less than 50 characters"
      ],
      compensationRangeToRules: [
        v => !!v || "Compensation Range To is required",
        v => (v && v.length <= 50) || "Compensation Range To must be less than 50 characters"
      ],
      monthlySalaryCreditRules: [
        v => !!v || "Monthly Salary Credit is required",
        v => (v && v.length <= 50) || "Monthly Salary Credit must be less than 50 characters"
      ],
      employerContributionRules: [
        v => !!v || "Employer Contribution is required",
        v => (v && v.length <= 50) || "Employer Contribution must be less than 50 characters"
      ],
      employerContributionRules: [
        v => !!v || "Employee Contribution is required",
        v => (v && v.length <= 50) || "Employee Contribution must be less than 50 characters"
      ],
      totalRules: [
        v => !!v || "Total is required",
        v => (v && v.length <= 50) || "Total must be less than 50 characters"
      ]
    }
  }),

  computed: {
    ...mapGetters("sssContributionTables", ["getSssContributionTableById"]),
    formTitle() {
      return this.formType === "new" ? "New SSS Contribution" : "Edit SSS Contribution";
    },
    formIcon() {
      return this.formType === "new" ? "add_box" : "edit";
    }
  },

  mounted() {
    this.getSssContributionTableData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("sssContributionTables", {
      getSssContributionTableData: "getData",
      saveSssContributionTableData: "saveData",
      updateSssContributionTableData: "updateData",
      deleteSssContributionTableData: "deleteData"
    }),

    editItem(id) {
      let data = this.getSssContributionTableById(id);
      this.formData.id = data.id;
      this.formData.compensation_range_from = data.compensation_range_from;
      this.formData.compensation_range_to = data.compensation_range_to;
      this.formData.monthly_salary_credit = data.monthly_salary_credit;
      this.formData.employer_contribution = data.employer_contribution;
      this.formData.employee_contribution = data.employee_contribution;
      this.formData.total = data.total;
      this.formType = "update";
    },

    deleteItem(id) {
      this.deleteSssContributionTableData(id)
        .then(response => {
          let obj = {
            alert: true,
            type: "success",
            message: response.data.message
          };
          this.setAlert(obj);
        })
        .catch(err => console.log(err));
    },

    close() {
      this.$emit("setDialog", false);
      this.formType = "new";
      setTimeout(() => {
        this.formData = Object.assign({}, this.defaultFormData);
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.formType === "new") {
          this.saveSssContributionTableData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };
              this.setAlert(obj);
            })
            .catch(err => console.log(err));
        } else if (this.formType === "update") {
          this.updateSssContributionTableData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };
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