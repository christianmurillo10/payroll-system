<template>
  <v-container fluid>
    <Alerts />
    <v-divider></v-divider>
    <v-toolbar color="#EEEEEE" dense>
      <v-toolbar-title>
        <v-icon class="black--text">view_list</v-icon>Withholding Tax Tables
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>add_box</v-icon>
          </v-btn>
        </template>
        <ModalForm ref="modalForm" @setDialog="setDialog" />
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="withholdingTaxTableList" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.compensation_range_from }}</td>
        <td class="text-xs-left">{{ props.item.compensation_range_to }}</td>
        <td class="text-xs-left">{{ props.item.tax_amount }}</td>
        <td class="text-xs-left">{{ props.item.tax_percentage }}</td>
        <td class="text-xs-left">{{ getPayFrequencyNameById(props.item.pay_frequency_id) }}</td>
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
      { text: "Compensation Range From", value: "compensation_range_from" },
      { text: "Compensation Range To", value: "compensation_range_to" },
      { text: "Tax Amount", value: "tax_amount" },
      { text: "Tax Percentage", value: "tax_percentage" },
      { text: "Pay Frequency", value: "pay_frequency_id" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ]
  }),

  computed: {
    ...mapState("withholdingTaxTables", ["withholdingTaxTableList"]),
    ...mapGetters("payFrequencies", ["getPayFrequencyNameById"])
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