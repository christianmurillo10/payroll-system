<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <Alerts />
        <v-flex xs12 sm12 md12 lg12>
          <v-layout wrap>
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
            <v-flex xs12 sm12 md8 lg8>
              <v-card>
                <v-card-title>
                  <h4>Payroll Summary</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md6 lg6>
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
                    </v-flex>
                    <v-flex xs12 sm12 md6 lg6>
                      <v-list-tile>
                        <v-list-tile-content>Total Working Day:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ formData.payroll.total_working_day_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Night Differential:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ formData.payroll.total_night_differential_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Overtime:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ formData.payroll.total_overtime_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Other Salary and Wages:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ formData.payroll.total_other_salary_and_wages_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Tardiness:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ `(${formData.payroll.total_tardiness_amount})` }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Gross Amount:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ formData.payroll.gross_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Non-Taxable:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ formData.payroll.total_non_taxable_amount }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Total Deduction:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end"
                        >{{ `(${formData.payroll.total_deduction_amount})` }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Net Amount:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ formData.payroll.net_amount }}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
      <v-container grid-list-md>
        <v-flex xs12 sm12 md12 lg12>
          <v-card :elevation="3" max-width="auto">
            <v-flex xs12 sm12 md12>
              <v-tabs fixed-tabs dark show-arrows>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab
                  v-for="(header, i) in tabHeaders"
                  :key="i"
                  :href="'#tab-' + header.key"
                >{{ header.title }}</v-tab>

                <v-tabs-items>
                  <v-tab-item value="tab-working-days">
                    <v-layout wrap pa-3>
                      <!-- Working Days -->
                      <v-flex xs12 sm12 md3 offset-xs2>
                        <v-flex xs12 sm12 md12 lg12>
                          <v-card>
                            <v-card-title>
                              <h4>Working Days</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Regular Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.regular_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.special_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.special_day_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.double_holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.double_holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-content>Total:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.workingDay.total_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md9 lg7>
                        <v-form ref="form" @submit.prevent="computeWorkingDays">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.regular_day"
                                  label="Regular Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.special_day"
                                  label="Special Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.special_day_ford"
                                  label="Special Day falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.workingDay.holiday"
                                    label="Holiday"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.workingDay.holiday_ford"
                                    label="Holiday falling on rest day"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                              </v-flex>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.double_holiday"
                                  label="Double Holiday"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.double_holiday_ford"
                                  label="Double Holiday falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <div class="text-xs-center">
                                  <v-btn type="submit" round color="primary" dark>Compute</v-btn>
                                </div>
                              </v-flex>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab-item value="tab-night-differentials">
                    <v-layout wrap pa-3>
                      <!-- Night Differentials -->
                      <v-flex xs12 sm12 md3 offset-xs2>
                        <v-flex xs12 sm12 md12 lg12 pb-4>
                          <v-card>
                            <v-card-title>
                              <h4>Night Differentials</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Regular Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.regular_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.special_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.special_day_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.double_holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.double_holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-content>Total:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.nightDifferential.total_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md9 lg7>
                        <v-form ref="form" @submit.prevent="computeNightDifferentials">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.nightDifferential.regular_day"
                                  label="Regular Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.nightDifferential.special_day"
                                  label="Special Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.nightDifferential.special_day_ford"
                                  label="Special Day falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.nightDifferential.holiday"
                                    label="Holiday"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.nightDifferential.holiday_ford"
                                    label="Holiday falling on rest day"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                              </v-flex>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.double_holiday"
                                  label="Double Holiday"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.workingDay.double_holiday_ford"
                                  label="Double Holiday falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <div class="text-xs-center">
                                  <v-btn type="submit" round color="primary" dark>Compute</v-btn>
                                </div>
                              </v-flex>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab-item value="tab-overtimes">
                    <v-layout wrap pa-3>
                      <!-- Overtimes -->
                      <v-flex xs12 sm12 md3 offset-xs2>
                        <v-flex xs12 sm12 md12 lg12 pb-4>
                          <v-card>
                            <v-card-title>
                              <h4>Overtimes</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Regular Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.regular_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.special_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Special Day falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.special_day_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.double_holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Double Holiday falling on rest day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.double_holiday_ford_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-content>Total:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.overtime.total_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md9 lg7>
                        <v-form ref="form" @submit.prevent="computeOvertimes">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.overtime.regular_day"
                                  label="Regular Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.overtime.special_day"
                                  label="Special Day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.overtime.special_day_ford"
                                  label="Special Day falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.overtime.holiday"
                                    label="Holiday"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                    v-model="formData.overtime.holiday_ford"
                                    label="Holiday falling on rest day"
                                    type="number"
                                    prepend-icon="money"
                                  ></v-text-field>
                                </v-flex>
                              </v-flex>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.overtime.double_holiday"
                                  label="Double Holiday"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.overtime.double_holiday_ford"
                                  label="Double Holiday falling on rest day"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <div class="text-xs-center">
                                  <v-btn type="submit" round color="primary" dark>Compute</v-btn>
                                </div>
                              </v-flex>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab-item value="tab-tardiness">
                    <v-layout wrap pa-3>
                      <!-- Tardiness -->
                      <v-flex xs12 sm12 md3 offset-xs2>
                        <v-flex xs12 sm12 md12 lg12 pb-4>
                          <v-card>
                            <v-card-title>
                              <h4>Tardiness</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Undertime:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.undertime_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Half Day:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.half_day_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Sick Leave:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.sick_leave_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Vacation Leave:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.vacation_leave_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Holiday:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.holiday_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Absent:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.absent_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Total Absent:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.total_absent_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-content>Total:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.tardiness.total_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md9 lg7>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md4 lg4>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.undertime"
                                label="Overtime"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.half_day"
                                label="Half Day"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.sick_leave"
                                label="Sick Leave"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.vacation_leave"
                                label="Vacation Leave"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.holiday"
                                label="Holiday"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                          </v-flex>
                          <v-flex xs12 sm12 md4 lg4>
                            <v-flex xs12 sm12 md12>
                              <v-text-field
                                v-model="formData.tardiness.absent"
                                label="Absent"
                                type="number"
                                prepend-icon="money"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <div class="text-xs-center">
                                <v-btn round color="primary" dark>Compute</v-btn>
                              </div>
                            </v-flex>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-flex>
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
    tabHeaders: [
      {
        key: "working-days",
        title: "Working Days"
      },
      {
        key: "night-differentials",
        title: "Night Differentials"
      },
      {
        key: "overtimes",
        title: "Overtimes"
      },
      {
        key: "tardiness",
        title: "Tardiness"
      }
    ],
    defaultFormData: {
      employee_id: null,
      payroll: {
        basic_salary_amount: "0.00",
        fixed_allowance_amount: "0.00",
        daily_allowance_amount: "0.00",
        daily_rate_amount: "0.00",
        total_working_day_amount: "0.00",
        total_night_differential_amount: "0.00",
        total_overtime_amount: "0.00",
        total_other_salary_and_wages_amount: "0.00",
        total_tardiness_amount: "0.00",
        gross_amount: "0.00",
        total_non_taxable_amount: "0.00",
        total_deduction_amount: "0.00",
        net_amount: "0.00"
      },
      workingDay: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00"
      },
      nightDifferential: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00"
      },
      overtime: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00"
      },
      tardiness: {
        undertime: "0.00",
        half_day: "0.00",
        sick_leave: "0.00",
        vacation_leave: "0.00",
        holiday: "0.00",
        absent: "0.00",
        total_absent: "0.00"
      }
    },
    formData: {
      employee_id: null,
      payroll: {
        basic_salary_amount: "0.00",
        fixed_allowance_amount: "0.00",
        daily_allowance_amount: "0.00",
        daily_rate_amount: "0.00",
        total_working_day_amount: "0.00",
        total_night_differential_amount: "0.00",
        total_overtime_amount: "0.00",
        total_other_salary_and_wages_amount: "0.00",
        total_tardiness_amount: "0.00",
        gross_amount: "0.00",
        total_non_taxable_amount: "0.00",
        total_deduction_amount: "0.00",
        net_amount: "0.00"
      },
      workingDay: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00",
        regular_day_amount: "0.00",
        special_day_amount: "0.00",
        special_day_ford_amount: "0.00",
        holiday_amount: "0.00",
        holiday_ford_amount: "0.00",
        double_holiday_amount: "0.00",
        double_holiday_ford_amount: "0.00",
        total_amount: "0.00"
      },
      nightDifferential: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00",
        regular_day_amount: "0.00",
        special_day_amount: "0.00",
        special_day_ford_amount: "0.00",
        holiday_amount: "0.00",
        holiday_ford_amount: "0.00",
        double_holiday_amount: "0.00",
        double_holiday_ford_amount: "0.00",
        total_amount: "0.00"
      },
      overtime: {
        regular_day: "0.00",
        special_day: "0.00",
        special_day_ford: "0.00",
        holiday: "0.00",
        holiday_ford: "0.00",
        double_holiday: "0.00",
        double_holiday_ford: "0.00",
        regular_day_amount: "0.00",
        special_day_amount: "0.00",
        special_day_ford_amount: "0.00",
        holiday_amount: "0.00",
        holiday_ford_amount: "0.00",
        double_holiday_amount: "0.00",
        double_holiday_ford_amount: "0.00",
        total_amount: "0.00"
      },
      tardiness: {
        undertime: "0.00",
        half_day: "0.00",
        sick_leave: "0.00",
        vacation_leave: "0.00",
        holiday: "0.00",
        absent: "0.00",
        total_absent: "0.00",
        undertime_amount: "0.00",
        half_day_amount: "0.00",
        sick_leave_amount: "0.00",
        vacation_leave_amount: "0.00",
        holiday_amount: "0.00",
        absent_amount: "0.00",
        total_absent_amount: "0.00",
        total_amount: "0.00"
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
    ...mapActions("payrollWorkingDays", {
      computePayrollWorkingDaysData: "computeData"
    }),
    ...mapActions("payrollNightDifferentials", {
      computePayrollNightDifferentialsData: "computeData"
    }),
    ...mapActions("payrollOvertimes", {
      computePayrollOvertimesData: "computeData"
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

    computeWorkingDays() {
      if (this.$refs.form.validate()) {
        let obj = {
          basic: this.formData.payroll.basic_salary_amount,
          regular_day: this.formData.workingDay.regular_day,
          special_day: this.formData.workingDay.special_day,
          special_day_ford: this.formData.workingDay.special_day_ford,
          holiday: this.formData.workingDay.holiday,
          holiday_ford: this.formData.workingDay.holiday_ford,
          double_holiday: this.formData.workingDay.double_holiday,
          double_holiday_ford: this.formData.workingDay.double_holiday_ford
        };

        this.computePayrollWorkingDaysData(obj)
          .then(response => {
            console.log(response);
          })
          .catch(err => console.log(err));
      }
    },

    computeNightDifferentials() {
      if (this.$refs.form.validate()) {
        let obj = {
          basic: this.formData.payroll.basic_salary_amount,
          regular_day: this.formData.nightDifferential.regular_day,
          special_day: this.formData.nightDifferential.special_day,
          special_day_ford: this.formData.nightDifferential.special_day_ford,
          holiday: this.formData.nightDifferential.holiday,
          holiday_ford: this.formData.nightDifferential.holiday_ford,
          double_holiday: this.formData.nightDifferential.double_holiday,
          double_holiday_ford: this.formData.nightDifferential
            .double_holiday_ford
        };

        this.computePayrollNightDifferentialsData(obj)
          .then(response => {
            console.log(response);
          })
          .catch(err => console.log(err));
      }
    },

    computeOvertimes() {
      if (this.$refs.form.validate()) {
        let obj = {
          basic: this.formData.payroll.basic_salary_amount,
          regular_day: this.formData.overtime.regular_day,
          special_day: this.formData.overtime.special_day,
          special_day_ford: this.formData.overtime.special_day_ford,
          holiday: this.formData.overtime.holiday,
          holiday_ford: this.formData.overtime.holiday_ford,
          double_holiday: this.formData.overtime.double_holiday,
          double_holiday_ford: this.formData.overtime.double_holiday_ford
        };

        this.computePayrollOvertimesData(obj)
          .then(response => {
            console.log(response);
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>