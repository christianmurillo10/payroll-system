<template>
  <div>
    <Alerts />
    <v-divider></v-divider>
    <v-toolbar color="#EEEEEE" dense>
      <v-toolbar-title>
        <v-icon class="black--text">view_list</v-icon>Employees - View
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
      <v-container grid-list-md>
        <v-layout wrap>
          <template>
            <v-flex xs12 sm6 md4 lg3>
              <v-card :elevation="5">
                <v-card-title class="subheading font-weight-bold">Employee Details</v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Employee No:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.employee_no }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Firstname:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.firstname }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Middlename:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.middlename }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Lastname:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.lastname }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Primary Address:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.primary_address }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Secondary Address:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.secondary_address }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Email:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.email }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Mobile:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.mobile }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Landline:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.landline }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>TIN No:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.tin_no }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>SSS No:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.sss_no }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Philhealth No:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.philhealth_no }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Pagibig No:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.pagibig_no }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Birthdate:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.birthdate }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Date Start:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.date_start }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Date End:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ employeeDetails.date_end }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Active?:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ getActive(employeeDetails.is_active) }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Alerts from "@/components/utilities/Alerts";
import Mixins from "@/helpers/Mixins.js";
import { mapActions } from "vuex";

export default {
  components: {
    Alerts
  },
  mixins: [Mixins],

  data: () => ({
    employeeDetails: ""
  }),

  mounted() {
    this.getEmployeeDataById(this.$route.params.id).then(response => {
      this.employeeDetails = response.data.result;
    });
  },

  methods: {
    ...mapActions("employees", { getEmployeeDataById: "getDataById" })
  }
};
</script>