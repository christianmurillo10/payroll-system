<template>
  <div>
    <Alerts />
    <v-divider></v-divider>
    <v-toolbar color="#EEEEEE" dense>
      <v-toolbar-title>
        <v-icon class="black--text">view_list</v-icon>Employees - View
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/employees" tag="button"><v-icon>arrow_back</v-icon></router-link>
    </v-toolbar>
    <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
      <v-container grid-list-md>
        <v-layout wrap>
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

  // data: () => ({
  //   employeeDetails: ""
  // }),

  // mounted() {
  //   this.getEmployeeDataById(this.$route.params.id).then(response => {
  //     this.employeeDetails = response.data.result;
  //   });
  // },

  // methods: {
  //   ...mapActions("employees", { getEmployeeDataById: "getDataById" })
  // }
};
</script>