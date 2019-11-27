<template>
  <v-container fluid>
    <Alerts />
    <v-divider></v-divider>
    <v-toolbar color="#EEEEEE" dense>
      <v-toolbar-title>
        <v-icon class="black--text">view_list</v-icon>Employees
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="999px">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>add_box</v-icon>
          </v-btn>
        </template>
        <ModalForm ref="modalForm" @setDialog="setDialog" />
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="employeeList" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">
          <router-link v-bind:to="'/employees/view/' + props.item.id">{{ props.item.employee_no }}</router-link>
        </td>
        <td class="text-xs-left">{{ `${props.item.firstname} ${props.item.lastname}` }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.date_start }}</td>
        <td class="text-xs-left">{{ props.item.date_endo }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item.id)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <p class="justify-center layout px-0">No data found!</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Alerts from "../../components/utilities/Alerts";
import ModalForm from "./ModalForm";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Alerts,
    ModalForm
  },

  data: () => ({
    dialog: false,
    headers: [
      { text: "Employee No", value: "employee_no" },
      { text: "Name", value: "firstname" },
      { text: "Email", value: "email" },
      { text: "Date Start", value: "date_start" },
      { text: "Date Endo", value: "date_endo" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ]
  }),

  computed: {
    ...mapState("employees", ["employeeList"])
    // ...mapGetters("employees", ["getPayFrequencyNameById"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(id) {
      this.setDialog(true);
      this.$refs.modalForm.editItem(id);
    },

    deleteItem(id) {
      this.$refs.modalForm.deleteItem(id);
    },

    close() {
      this.setDialog(false);
      this.$refs.modalForm.close();
    },

    setDialog(value) {
      this.dialog = value;
    }
  }
};
</script>