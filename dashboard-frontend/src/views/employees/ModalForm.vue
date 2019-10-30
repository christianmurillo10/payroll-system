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
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="formData.employee_no"
                  :rules="validateItem.employeeNoRules"
                  label="Employee No"
                  required
                ></v-text-field>
              </v-flex>
            <v-flex xs12 sm12 md4></v-flex>
            <v-flex xs12 sm12 md4>
              <v-menu
                ref="date_start"
                v-model="date_start"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="formData.date_start"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formData.date_start"
                    label="Date Start"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="formData.date_start" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="date_start = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.date_start.save(formData.date_start)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="formData.firstname"
                :rules="validateItem.firstnameRules"
                label="Firstname"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="formData.middlename"
                label="Middlename"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="formData.lastname"
                :rules="validateItem.lastnameRules"
                label="Lastname"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.primary_address"
                :rules="validateItem.primaryAddressRules"
                label="Primary Address"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.secondary_address"
                label="Secondary Address"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md8>
              <v-text-field
                v-model="formData.email"
                :rules="validateItem.emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-menu
                ref="birthdate"
                v-model="birthdate"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="formData.birthdate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formData.birthdate"
                    label="Birthdate"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="formData.birthdate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="birthdate = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.birthdate.save(formData.birthdate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="formData.mobile"
                label="Mobile"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="formData.landline"
                label="Landline"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.tin_no"
                label="TIN No"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.sss_no"
                label="SSS No"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.philhealth_no"
                label="Philhealth No"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.pagibig_no"
                label="Pagibig No"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-select
                :items="getPayFrequencyList"
                item-text="name"
                item-value="id"
                v-model="formData.pay_frequency_id"
                :rules="validateItem.payFrequencyRules"
                label="Pay Frequency"
                required
              ></v-select>
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
    birthdate: false,
    date_start: false,
    defaultFormData: {
      employee_no: null,
      firstname: null,
      middlename: null,
      lastname: null,
      primary_address: null,
      secondary_address: null,
      email: null,
      mobile: null,
      landline: null,
      tin_no: null,
      sss_no: null,
      philhealth_no: null,
      pagibig_no: null,
      pay_frequency_id: null,
      birthdate: new Date().toISOString().substr(0, 10),
      date_start: new Date().toISOString().substr(0, 10)
    },
    formType: "new",
    formData: {
      employee_no: null,
      firstname: null,
      middlename: null,
      lastname: null,
      primary_address: null,
      secondary_address: null,
      email: null,
      mobile: null,
      landline: null,
      tin_no: null,
      sss_no: null,
      philhealth_no: null,
      pagibig_no: null,
      pay_frequency_id: null,
      birthdate: new Date().toISOString().substr(0, 10),
      date_start: new Date().toISOString().substr(0, 10)
    },
    valid: true,
    validateItem: {
      employeeNoRules: [
        v => !!v || "Employee No is required"
      ],
      firstnameRules: [
        v => !!v || "Firstname is required"
      ],
      lastnameRules: [
        v => !!v || "Lastname is required"
      ],
      primaryAddressRules: [
        v => !!v || "Primary Address is required"
      ],
      emailRules: [
        v => !!v || "Email is required"
      ],
      payFrequencyRules: [
        v => !!v || "Pay Frequency is required"
      ],
      birthdateRules: [
        v => !!v || "Birthdate is required"
      ],
      dateStartRules: [
        v => !!v || "Date Start is required"
      ]
    }
  }),

  computed: {
    ...mapGetters("employees", ["getEmployeeById"]),
    ...mapGetters("payFrequencies", ["getPayFrequencyList"]),
    formTitle() {
      return this.formType === "new" ? "New Employee" : "Edit Employee";
    },
    formIcon() {
      return this.formType === "new" ? "add_box" : "edit";
    }
  },

  mounted() {
    this.getEmployeeData();
  },

  created() {
    this.getPayFrequenciesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("payFrequencies", {getPayFrequenciesData: "getData"}),
    ...mapActions("employees", {
      getEmployeeData: "getData",
      saveEmployeeData: "saveData",
      updateEmployeeData: "updateData",
      deleteEmployeeData: "deleteData"
    }),

    editItem(id) {
      let data = this.getEmployeeById(id);
      this.formData.id = data.id;
      this.formData.employee_no = data.employee_no;
      this.formData.firstname = data.firstname;
      this.formData.middlename = data.middlename;
      this.formData.lastname = data.lastname;
      this.formData.primary_address = data.primary_address;
      this.formData.secondary_address = data.secondary_address;
      this.formData.email = data.email;
      this.formData.mobile = data.mobile;
      this.formData.landline = data.landline;
      this.formData.tin_no = data.tin_no;
      this.formData.sss_no = data.sss_no;
      this.formData.philhealth_no = data.philhealth_no;
      this.formData.pagibig_no = data.pagibig_no;
      this.formData.pay_frequency_id = data.pay_frequency_id;
      this.formData.birthdate = data.birthdate;
      this.formData.date_start = data.date_start;
      this.formType = "update";
    },

    deleteItem(id) {
      this.deleteEmployeeData(id)
        .then(response => {
          let obj = {
            alert: true,
            type: "success",
            message: response.data.message
          };
          
          if (!response.data.result) obj.type = "error"
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
          this.saveEmployeeData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };

              if (!response.data.result) obj.type = "error"
              this.setAlert(obj);
            })
            .catch(err => console.log(err));
        } else if (this.formType === "update") {
          this.updateEmployeeData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };

              if (!response.data.result) obj.type = "error"
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