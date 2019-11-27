<template>
  <v-container fluid>
    <Alerts />
    <v-flex xs12 sm12 md12 lg12>
      <v-dialog v-model="dialog" persistent max-width="999px">
        <template v-slot:activator="{ on }">
          <v-btn color="success" v-on="on">
            <v-icon>add_box</v-icon>&nbsp; Add New
          </v-btn>
        </template>
        <ModalForm ref="modalForm" @setDialog="setDialog" />
      </v-dialog>

      <v-data-table :headers="headers" :items="payrollList" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-left">
            <router-link v-bind:to="'/employees/view/' + props.item.id">{{ props.item.date }}</router-link>
          </td>
          <td class="text-xs-left">{{ props.item.employee_id }}</td>
          <td class="text-xs-left">{{ props.item.date_from }}</td>
          <td class="text-xs-left">{{ props.item.date_to }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item.id)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <p class="justify-center layout px-0">No data found!</p>
        </template>
      </v-data-table>
    </v-flex>
  </v-container>
</template>

<script>
import Alerts from "../../components/utilities/Alerts";
import ModalForm from "./ModalForm";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Alerts,
    ModalForm
  },

  data: () => ({
    dialog: false,
    headers: [
      { text: "Date", value: "date" },
      { text: "Employee", value: "employee_id" },
      { text: "Date From", value: "date_from" },
      { text: "Date To", value: "date_to" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ]
  }),

  computed: {
    ...mapState("payrolls", ["payrollList"])
  },

  mounted() {
    this.getPayrollData();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("payrolls", {
      getPayrollData: "getData",
    }),

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