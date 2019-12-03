<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <Alerts />
        <v-flex xs12 sm12 md4 lg4>
          <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
            <v-card-title>
              <v-icon class="black--text" large left>view_list</v-icon>
              <span class="title">Payroll - Create</span>
            </v-card-title>

            <v-divider></v-divider>

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
                    @change="getEmployeeDetails()"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-container>
      <v-container>
        <v-flex xs12 sm12 md12 lg12>
          <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-flex xs12 sm12 md3 offset-lg4>
                    <v-card>
                      <v-card-title>
                        <h4>Employee Details</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Basic Salary:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.basic_salary_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Rate:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-flex>

                <!-- Working Days -->
                <v-flex xs12 sm12 md3>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card>
                      <v-card-title>
                        <h4>Working Days</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Basic Salary:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.basic_salary_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Rate:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.basic_salary_amount"
                      label="Basic Salary Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.fixed_allowance_amount"
                      label="Fixed Allowance Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-flex>

                <!-- Night Differentials -->
                <v-flex xs12 sm12 md3>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card>
                      <v-card-title>
                        <h4>Night Differentials</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Basic Salary:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.basic_salary_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Rate:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.basic_salary_amount"
                      label="Basic Salary Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.fixed_allowance_amount"
                      label="Fixed Allowance Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-flex>

                <!-- Overtimes -->
                <v-flex xs12 sm12 md3>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card>
                      <v-card-title>
                        <h4>Overtimes</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Basic Salary:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.basic_salary_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Rate:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.basic_salary_amount"
                      label="Basic Salary Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.fixed_allowance_amount"
                      label="Fixed Allowance Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-flex>

                <!-- Tardiness -->
                <v-flex xs12 sm12 md3>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card>
                      <v-card-title>
                        <h4>Tardiness</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Basic Salary:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.basic_salary_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Rate:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                          >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.basic_salary_amount"
                      label="Basic Salary Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="formData.payroll.fixed_allowance_amount"
                      label="Fixed Allowance Amount"
                      type="number"
                      prepend-icon="money"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import Alerts from "@/components/utilities/Alerts";
import Mixins from "@/helpers/Mixins.js";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Alerts
  },
  mixins: [Mixins],

  data: () => ({
    defaultFormData: {
      employee_id: null,
      payroll: {
        basic_salary_amount: null,
        fixed_allowance_amount: null,
        daily_allowance_amount: null,
        daily_rate_amount: null,
        total_working_day_amount: null,
        total_night_differential_amount: null,
        total_overtime_amount: null,
        total_other_salary_and_wages_amount: null,
        total_tardiness_amount: null,
        gross_amount: null,
        total_non_taxable_amount: null,
        total_deduction_amount: null,
        net_amount: null
      }
    },
    formData: {
      employee_id: null,
      payroll: {
        basic_salary_amount: null,
        fixed_allowance_amount: null,
        daily_allowance_amount: null,
        daily_rate_amount: null,
        total_working_day_amount: null,
        total_night_differential_amount: null,
        total_overtime_amount: null,
        total_other_salary_and_wages_amount: null,
        total_tardiness_amount: null,
        gross_amount: null,
        total_non_taxable_amount: null,
        total_deduction_amount: null,
        net_amount: null
      }
    },
    valid: true,
    validateItem: {
      employeeRules: [v => !!v || "Employee is required"]
    }
  }),

  computed: {
    ...mapGetters("employees", ["getEmployeeList"]),
    ...mapState("employeeSalariesAndAllowances", [
      "employeeId",
      "employeeSalariesAndAllowancesIsCurrentData"
    ])
  },

  created() {
    this.formData.employee_id = this.employeeId;
    this.getEmployeesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("employees", { getEmployeesData: "getData" }),
    ...mapActions("employeeSalariesAndAllowances", {
      getEmployeeSalariesAndAllowancesIsCurrentDataByEmployeeId:
        "getIsCurrentDataByEmployeeId"
    }),

    getEmployeeDetails() {
      this.getEmployeeSalariesAndAllowancesIsCurrentDataByEmployeeId(
        this.formData.employee_id
      )
        .then(response => {
          let obj = {
            alert: true,
            type: "success",
            message: response.data.message
          };
          if (!response.data.result) obj.type = "error";
          this.setAlert(obj);
          if (response.data.result) {
            this.formData.payroll.basic_salary_amount =
              response.data.result[0].salary_amount;
            this.formData.payroll.fixed_allowance_amount =
              response.data.result[0].allowance_amount;
          } else {
            this.formData.payroll.basic_salary_amount = this.defaultFormData.payroll.basic_salary_amount;
            this.formData.payroll.fixed_allowance_amount = this.defaultFormData.payroll.fixed_allowance_amount;
          }
        })
        .catch(err => console.log(err));
    },

    generate() {
      if (this.$refs.form.validate()) {
        // this.getEmployeeSalariesAndAllowancesDataByEmployeeId(
        //   this.formData.employee_id
        // )
        //   .then(response => {
        //     let obj = {
        //       alert: true,
        //       type: "success",
        //       message: response.data.message
        //     };
        //     if (!response.data.result) obj.type = "error";
        //     this.setAlert(obj);
        //   })
        //   .catch(err => console.log(err));
      }
    }
  }
};
</script>