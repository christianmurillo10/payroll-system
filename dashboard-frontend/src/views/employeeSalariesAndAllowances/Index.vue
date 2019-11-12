<template>
  <div>
    <Alerts />
    <v-divider></v-divider>
    <v-flex xs12 sm6 md4 lg4>
      <v-toolbar color="#EEEEEE" dense>
        <v-toolbar-title>
          <v-icon class="black--text">view_list</v-icon>Employees - View
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/employees" tag="button">
          <v-icon>arrow_back</v-icon>
        </router-link>
      </v-toolbar>
      <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-autocomplete
              v-model="model"
              :items="states"
              label="Choose One"
              persistent-hint
              prepend-icon="list"
            ></v-autocomplete>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
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
    states: [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ]
  })
};
</script>