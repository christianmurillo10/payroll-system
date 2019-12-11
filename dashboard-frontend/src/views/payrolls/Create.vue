<template>
  <div>
    <v-layout row wrap>
      <v-container grid-list-md>
        <Alerts />
        <v-flex xs12 sm12 md12 lg12>
          <v-card :elevation="3" max-width="auto">
            <v-card-title>
              <v-icon class="black--text" left>view_list</v-icon>
              <span class="title">Payroll - Create</span>
            </v-card-title>
            <v-flex xs12 sm12 md12>
              <v-tabs fixed-tabs show-arrows>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab
                  v-for="(header, i) in tabHeaders"
                  :key="i"
                  :href="'#tab-' + header.key"
                >{{ header.title }}</v-tab>

                <v-tabs-items>
                  <v-tab-item value="tab-payroll-details">
                    <v-layout wrap pa-3>
                      <!-- Payroll Details -->
                      <v-flex xs12 sm12 md12 lg7 offset-lg4>
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-autocomplete
                                  :items="getEmployeeList"
                                  item-text="firstname"
                                  item-value="id"
                                  v-model="formData.employeeDetails.id"
                                  :rules="validateItem.employeeRules"
                                  label="Employee"
                                  required
                                  persistent-hint
                                  prepend-icon="list"
                                  @change="getEmployeeDetails()"
                                ></v-autocomplete>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-menu
                                  ref="date"
                                  v-model="date"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="formData.payroll.date"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="formData.payroll.date"
                                      label="Date"
                                      prepend-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="formData.payroll.date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="date = false">Cancel</v-btn>
                                    <v-btn
                                      flat
                                      color="primary"
                                      @click="$refs.date.save(formData.payroll.date)"
                                    >OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                            </v-flex>
                            <v-flex xs12 sm12 md6 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-menu
                                  ref="date_from"
                                  v-model="date_from"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="formData.payroll.date_from"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="formData.payroll.date_from"
                                      label="Date From"
                                      prepend-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="formData.payroll.date_from" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="date_from = false">Cancel</v-btn>
                                    <v-btn
                                      flat
                                      color="primary"
                                      @click="$refs.date_from.save(formData.payroll.date_from)"
                                    >OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-menu
                                  ref="date_to"
                                  v-model="date_to"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="formData.payroll.date_to"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="formData.payroll.date_to"
                                      label="Date To"
                                      prepend-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="formData.payroll.date_to" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="date_to = false">Cancel</v-btn>
                                    <v-btn
                                      flat
                                      color="primary"
                                      @click="$refs.date_to.save(formData.payroll.date_to)"
                                    >OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                            </v-flex>
                          </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab-item value="tab-working-days">
                    <v-layout wrap pa-3>
                      <!-- Working Days -->
                      <v-flex xs12 sm12 md12 lg3 offset-lg2>
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

                      <v-flex xs12 sm12 md12 lg7>
                        <v-form ref="form" @submit.prevent="computeWorkingDays">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
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
                            <v-flex xs12 sm12 md6 lg4>
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
                      <v-flex xs12 sm12 md12 lg3 offset-lg2>
                        <v-flex xs12 sm12 md12 lg12>
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

                      <v-flex xs12 sm12 md12 lg7>
                        <v-form ref="form" @submit.prevent="computeNightDifferentials">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
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
                            <v-flex xs12 sm12 md6 lg4>
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
                      <v-flex xs12 sm12 md12 lg3 offset-lg2>
                        <v-flex xs12 sm12 md12 lg12>
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

                      <v-flex xs12 sm12 md12 lg7>
                        <v-form ref="form" @submit.prevent="computeOvertimes">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
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
                            <v-flex xs12 sm12 md6 lg4>
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
                      <v-flex xs12 sm12 md12 lg3 offset-lg2>
                        <v-flex xs12 sm12 md12 lg12>
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

                      <v-flex xs12 sm12 md12 lg7>
                        <v-form ref="form" @submit.prevent="computeTardiness">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.tardiness.undertime"
                                  label="Undertime"
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
                            <v-flex xs12 sm12 md6 lg4>
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
                                  <v-btn type="submit" round color="primary" dark>Compute</v-btn>
                                </div>
                              </v-flex>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab-item value="tab-other-salaries-and-wages">
                    <v-layout wrap pa-3>
                      <!-- Other Salaries and Wages -->
                      <v-flex xs12 sm12 md12 lg3 offset-lg2>
                        <v-flex xs12 sm12 md12 lg12>
                          <v-card>
                            <v-card-title>
                              <h4>Other Salaries and Wages</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Taxable:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.otherSalariesAndWages.taxable_amount }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Non-Taxable:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.otherSalariesAndWages.non_taxable_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                            <v-list dense three-line>
                              <v-list-tile>
                                <v-list-tile-content>
                                  <v-list-tile-title>Description:</v-list-tile-title>
                                  <v-list-tile-sub-title>
                                    {{ formData.otherSalariesAndWages.description }}
                                  </v-list-tile-sub-title>
                                </v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md12 lg7>
                        <v-form ref="form" @submit.prevent="computeSalariesAndWages">
                          <v-layout wrap>
                            <v-flex xs12 sm12 md6 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.otherSalariesAndWages.taxable_amount"
                                  label="Taxable"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="formData.otherSalariesAndWages.non_taxable_amount"
                                  label="Non-Taxable"
                                  type="number"
                                  prepend-icon="money"
                                ></v-text-field>
                              </v-flex>
                            </v-flex>
                            <v-flex xs12 sm12 md6 lg4>
                              <v-flex xs12 sm12 md12>
                                <v-textarea
                                  v-model="formData.otherSalariesAndWages.description"
                                  auto-grow
                                  label="Description"
                                  rows="1"
                                ></v-textarea>
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

                  <v-tab-item value="tab-deductions">
                    <v-layout wrap pa-3>
                      <!-- Deductions -->
                      <!-- <v-flex xs12 sm12 md12 lg3 offset-lg2> -->
                      <v-flex xs12 sm12 md12 lg3>
                        <v-flex xs12 sm12 md12 lg12>
                          <v-card>
                            <v-card-title>
                              <h4>Deductions</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>SSS Payable:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.sss.bi_monthly.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>SSS Salary:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.sss.bi_monthly_salary_loan.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>PHIC Payable:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.phic.bi_monthly.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>HDMF Payable:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.hdmf.bi_monthly.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>HDMF Salary:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.hdmf.bi_monthly_salary_loan.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>HDMF Housing:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.hdmf.bi_monthly_housing.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Personal Cash:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.personal_cash.advances }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>W/tax Compensation:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.bir.with_tax_compensation.total }}</v-list-tile-content>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-content>Total:</v-list-tile-content>
                                <v-list-tile-content
                                  class="align-end"
                                >{{ formData.deductions.total_amount }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12 sm12 md12 lg9>
                        <v-form ref="form" @submit.prevent="computeWorkingDays">
                          <v-flex xs12 sm12 md12 lg12>
                            <v-layout wrap>
                              <v-flex xs12 sm12 md12 lg6>
                                <v-flex xs12 sm12 md12 lg12 offset-xs5 offset-sm6 offset-md5 offset-lg5>
                                  <h3>SSS</h3>
                                </v-flex>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly Contribution</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.sss.bi_monthly.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.sss.bi_monthly.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly Salary Loan</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.sss.bi_monthly_salary_loan.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.sss.bi_monthly_salary_loan.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs12 sm12 md12 lg6>
                                <v-flex xs12 sm12 md12 lg12 offset-xs5 offset-sm6 offset-md5 offset-lg5>
                                  <h3>PHIC</h3>
                                </v-flex>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly Contribution</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.phic.bi_monthly.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.phic.bi_monthly.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12>
                            <v-layout wrap>
                              <v-flex xs12 sm12 md12 lg6>
                                <v-flex xs12 sm12 md12 lg12 offset-xs5 offset-sm6 offset-md5 offset-lg5>
                                  <h3>HDMF</h3>
                                </v-flex>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly Contribution</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly Salary Loan</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly_salary_loan.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly_salary_loan.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <h4>Bi-Monthly housing</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly_housing.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.hdmf.bi_monthly_housing.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs12 sm12 md12 lg6>
                                <v-flex xs12 sm12 md12 lg12 offset-xs5 offset-sm6 offset-md5 offset-lg5>
                                  <h3>OTHERS</h3>
                                </v-flex>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <h4>BIR W/tax Compensation</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.bir.with_tax_compensation.fixed"
                                      label="Fixed"
                                      type="number"
                                      prepend-icon="money"
                                      readonly
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.bir.with_tax_compensation.adjustment"
                                      label="Adjustment"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <h4>Personal Cash</h4>
                                  </v-flex>
                                  <v-flex xs12 sm12 md6 lg6>
                                    <v-text-field
                                      v-model="formData.deductions.personal_cash.advances"
                                      label="Advances"
                                      type="number"
                                      prepend-icon="money"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-flex>
          </v-card>
        </v-flex>
      </v-container>
      <v-container fluid grid-list-md>
        <v-flex xs12 sm12 md12 lg12>
          <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12>
              <v-card>
                <v-list dense>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-list-tile-content class="align-center">
                        <h3>SUMMARY</h3>
                      </v-list-tile-content>
                    </v-flex>
                    <v-flex xs12 sm12 md6 lg6>
                      <v-layout wrap>
                        <v-flex xs12 sm12 md6 lg6>
                          <v-list-tile>
                            <v-list-tile-title><h3>Employee Details</h3></v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Name:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ `${formData.employeeDetails.lastname}, ${formData.employeeDetails.firstname} ${formData.employeeDetails.middlename}` }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Date:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ formData.payroll.date }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Date From:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ formData.payroll.date_from }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Date To:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ formData.payroll.date_to }}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6>
                          <v-list-tile>
                            <v-list-tile-title><h3>Non-Taxable</h3></v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Fixed Allowance:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ formData.payroll.fixed_allowance_amount }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Daily Allowance:</v-list-tile-content>
                            <v-list-tile-content
                              class="align-end"
                            >{{ formData.payroll.daily_allowance_amount }}</v-list-tile-content>
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
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12 sm12 md6 lg6 offset-md6 offset-lg6>
                          <v-list-tile>
                            <v-list-tile-title><h3>Taxable</h3></v-list-tile-title>
                          </v-list-tile>
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
                            >{{ formData.payroll.daily_rate_amount }}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>
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
        key: "payroll-details",
        title: "Payroll Details"
      },
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
      },
      {
        key: "other-salaries-and-wages",
        title: "Other Salaries and Wages"
      },
      {
        key: "deductions",
        title: "Deductions"
      }
    ],
    date: false,
    date_from: false,
    date_to: false,
    defaultFormData: {
      employeeDetails: {
        id: null,
        employee_no: "",
        firstname: "",
        middlename: "",
        lastname: ""
      },
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
        net_amount: "0.00",
        date: "",
        date_from: "",
        date_to: ""
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
      },
      otherSalariesAndWages: {
        taxable_amount: "0.00",
        non_taxable_amount: "0.00",
        description: ""
      },
      deductions: {
        sss: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_salary_loan: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        phic: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        hdmf: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_salary_loan: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_housing: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        personal_cash: {
          advances: "0.00"
        },
        bir: {
          with_tax_compensation: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        total_amount: "0.00"
      }
    },
    formData: {
      employeeDetails: {
        id: null,
        employee_no: "",
        firstname: "",
        middlename: "",
        lastname: ""
      },
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
        net_amount: "0.00",
        date: "",
        date_from: "",
        date_to: ""
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
      },
      otherSalariesAndWages: {
        taxable_amount: "0.00",
        non_taxable_amount: "0.00",
        description: ""
      },
      deductions: {
        sss: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_salary_loan: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        phic: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        hdmf: {
          bi_monthly: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_salary_loan: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          },
          bi_monthly_housing: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
        personal_cash: {
          advances: "0.00"
        },
        bir: {
          with_tax_compensation: {
            fixed: "0.00",
            adjustment: "0.00",
            total: "0.00"
          }
        },
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
    this.formData.employeeDetails.id = this.employeeId;
    this.getEmployeesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("employees", { getEmployeesData: "getData" }),
    ...mapActions("employeeSalariesAndAllowances", { getEmployeeSalariesAndAllowancesIsCurrentDataByEmployeeId: "getIsCurrentDataByEmployeeId" }),
    ...mapActions("payrollWorkingDays", { computePayrollWorkingDaysData: "computeData" }),
    ...mapActions("payrollNightDifferentials", { computePayrollNightDifferentialsData: "computeData" }),
    ...mapActions("payrollOvertimes", { computePayrollOvertimesData: "computeData" }),
    ...mapActions("payrollTardiness", { computePayrollTardinessData: "computeData" }),

    getEmployeeDetails() {
      this.getEmployeeSalariesAndAllowancesIsCurrentDataByEmployeeId(
        this.formData.employeeDetails.id
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
            this.formData.employeeDetails.employee_no = response.data.result[0].employees.employee_no
            this.formData.employeeDetails.firstname = response.data.result[0].employees.firstname
            this.formData.employeeDetails.middlename = response.data.result[0].employees.middlename
            this.formData.employeeDetails.lastname = response.data.result[0].employees.lastname
            this.formData.payroll.basic_salary_amount = response.data.result[0].salary_amount;
            this.formData.payroll.fixed_allowance_amount = response.data.result[0].allowance_amount;
          } else {
            this.formData.employeeDetails.employee_no = this.defaultFormData.employeeDetails.employee_no
            this.formData.employeeDetails.firstname = this.defaultFormData.employeeDetails.firstname
            this.formData.employeeDetails.middlename = this.defaultFormData.employeeDetails.middlename
            this.formData.employeeDetails.lastname = this.defaultFormData.employeeDetails.lastname
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
            this.formData.workingDay.regular_day_amount = response.data.result.regularDay;
            this.formData.workingDay.special_day_amount = response.data.result.specialDay;
            this.formData.workingDay.special_day_ford_amount = response.data.result.specialDayFord;
            this.formData.workingDay.holiday_amount = response.data.result.holiday;
            this.formData.workingDay.holiday_ford_amount = response.data.result.holidayFord;
            this.formData.workingDay.double_holiday_amount = response.data.result.doubleHoliday;
            this.formData.workingDay.double_holiday_ford_amount = response.data.result.doubleHolidayFord;
            this.formData.workingDay.total_amount = response.data.result.totalAmount;
            this.formData.payroll.total_working_day_amount = response.data.result.totalAmount;
            this.computeNetAmount();
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
          double_holiday_ford: this.formData.nightDifferential.double_holiday_ford
        };

        this.computePayrollNightDifferentialsData(obj)
          .then(response => {
            this.formData.nightDifferential.regular_day_amount = response.data.result.regularDay;
            this.formData.nightDifferential.special_day_amount = response.data.result.specialDay;
            this.formData.nightDifferential.special_day_ford_amount = response.data.result.specialDayFord;
            this.formData.nightDifferential.holiday_amount = response.data.result.holiday;
            this.formData.nightDifferential.holiday_ford_amount = response.data.result.holidayFord;
            this.formData.nightDifferential.double_holiday_amount = response.data.result.doubleHoliday;
            this.formData.nightDifferential.double_holiday_ford_amount = response.data.result.doubleHolidayFord;
            this.formData.nightDifferential.total_amount = response.data.result.totalAmount;
            this.formData.payroll.total_night_differential_amount = response.data.result.totalAmount;
            this.computeNetAmount();
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
            this.formData.overtime.regular_day_amount = response.data.result.regularDay;
            this.formData.overtime.special_day_amount = response.data.result.specialDay;
            this.formData.overtime.special_day_ford_amount = response.data.result.specialDayFord;
            this.formData.overtime.holiday_amount = response.data.result.holiday;
            this.formData.overtime.holiday_ford_amount = response.data.result.holidayFord;
            this.formData.overtime.double_holiday_amount = response.data.result.doubleHoliday;
            this.formData.overtime.double_holiday_ford_amount = response.data.result.doubleHolidayFord;
            this.formData.overtime.total_amount = response.data.result.totalAmount;
            this.formData.payroll.total_overtime_amount = response.data.result.totalAmount;
            this.computeNetAmount();
          })
          .catch(err => console.log(err));
      }
    },

    computeTardiness() {
      if (this.$refs.form.validate()) {
        let obj = {
          basic: this.formData.payroll.basic_salary_amount,
          undertime: this.formData.tardiness.undertime,
          half_day: this.formData.tardiness.half_day,
          sick_leave: this.formData.tardiness.sick_leave,
          vacation_leave: this.formData.tardiness.vacation_leave,
          holiday: this.formData.tardiness.holiday,
          absent: this.formData.tardiness.absent
        };

        this.computePayrollTardinessData(obj)
          .then(response => {
            this.formData.tardiness.undertime_amount = response.data.result.undertime;
            this.formData.tardiness.half_day_amount = response.data.result.halfDay;
            this.formData.tardiness.sick_leave_amount = response.data.result.sickLeave;
            this.formData.tardiness.vacation_leave_amount = response.data.result.vacationLeave;
            this.formData.tardiness.holiday_amount = response.data.result.holiday;
            this.formData.tardiness.absent_amount = response.data.result.absent;
            this.formData.tardiness.total_amount = response.data.result.totalAmount;
            this.formData.payroll.total_tardiness_amount = response.data.result.totalAmount;
            this.computeNetAmount();
          })
          .catch(err => console.log(err));
      }
    },

    computeSalariesAndWages() {
      this.formData.payroll.total_other_salary_and_wages_amount = this.formData.otherSalariesAndWages.taxable_amount;
      this.computeNetAmount();
    },

    computeGrossAmount() {
      let totalWorkingDay = this.formData.payroll.total_working_day_amount;
      let totalNighDifferential =  this.formData.payroll.total_night_differential_amount;
      let totalOvertime = this.formData.payroll.total_overtime_amount;
      let totalOtherSalaryAndWages = this.formData.payroll.total_other_salary_and_wages_amount;
      let totalTardiness = this.formData.payroll.total_tardiness_amount;
      let totalAmount = this.sum([totalWorkingDay, totalNighDifferential, totalOvertime, totalOtherSalaryAndWages]);
      let totalGrossAmount = totalAmount - totalTardiness;
      this.formData.payroll.gross_amount = totalGrossAmount.toFixed(2);
      return totalGrossAmount.toFixed(2);
    },

    computeTotalNonTaxable() {
      let allowance = this.formData.payroll.fixed_allowance_amount;
      let sickLeave =  this.formData.tardiness.sick_leave_amount;
      let vacation_leave = this.formData.tardiness.vacation_leave_amount;
      let holiday = this.formData.tardiness.holiday_amount;
      let otherSalariesAndWages = this.formData.otherSalariesAndWages.non_taxable_amount;
      let totalNonTaxableAmount = this.sum([allowance, sickLeave, vacation_leave, holiday, otherSalariesAndWages]);
      this.formData.payroll.total_non_taxable_amount = totalNonTaxableAmount.toFixed(2);
      return totalNonTaxableAmount.toFixed(2);
    },

    computeNetAmount() {
      let grossAmount = this.computeGrossAmount();
      let totalNonTaxable = this.computeTotalNonTaxable();
      let totalDeduction = this.formData.payroll.total_deduction_amount;
      let netAmount = (parseFloat(grossAmount) + parseFloat(totalNonTaxable)) - totalDeduction;
      this.formData.payroll.net_amount = netAmount.toFixed(2);
    },

    sum (input) {
      if (toString.call(input) !== "[object Array]")
        return false;

      let total = 0;
      for (let i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
          continue;
        }
        total += Number(input[i]);
      }
      return total;
    }
  }
};
</script>