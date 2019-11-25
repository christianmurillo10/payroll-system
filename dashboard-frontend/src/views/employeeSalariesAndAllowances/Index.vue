<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <Alerts />
        <v-flex xs12 sm6 md4 lg4>
          <v-card class="mx-auto my-12" :elevation="3" max-width="auto">
            <v-card-title>
              <v-icon class="black--text" large left>view_list</v-icon>
              <span class="title">Employees - Salaries And Allowances</span>
            </v-card-title>

            <v-divider></v-divider>

            <v-form ref="form" @submit.prevent="generate" v-model="valid" lazy-validation>
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
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" type="submit" flat :disabled="!valid">Generate</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-container>
      <v-container fluid v-if="employeeId">
        <v-flex xs12 sm12 md12 lg12>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="success" v-on="on">
                <v-icon>add_box</v-icon>&nbsp; Add New
              </v-btn>
            </template>
            <ModalForm ref="modalForm" @setDialog="setDialog" />
          </v-dialog>
          <v-data-table
            :headers="headers"
            :items="employeeSalariesAndAllowancesByEmployeeList"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.date_issued }}</td>
              <td class="text-xs-left">{{ props.item.salary_amount }}</td>
              <td class="text-xs-left">{{ props.item.allowance_amount }}</td>
              <td class="text-xs-left">{{ getYesNoStatus(props.item.is_current) }}</td>
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
    </v-layout>
  </div>
</template>

<script>
import Alerts from "@/components/utilities/Alerts";
import Mixins from "@/helpers/Mixins.js";
import ModalForm from "./ModalForm";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Alerts,
    ModalForm
  },
  mixins: [Mixins],

  data: () => ({
    dialog: false,
    defaultFormData: {
      employee_id: null
    },
    formData: {
      employee_id: null
    },
    valid: true,
    validateItem: {
      employeeRules: [v => !!v || "Employee is required"]
    },
    headers: [
      { text: "Date Issued", value: "date_issued" },
      { text: "Salary Amount", value: "salary_amount" },
      { text: "Allowance Amount", value: "allowance_amount" },
      { text: "Current?", value: "is_current" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ]
  }),

  computed: {
    ...mapGetters("employees", ["getEmployeeList"]),
    ...mapState("employeeSalariesAndAllowances", [
      "employeeId",
      "employeeSalariesAndAllowancesByEmployeeList"
    ])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.formData.employee_id = this.employeeId;
    this.getEmployeesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("employees", { getEmployeesData: "getData" }),
    ...mapActions("employeeSalariesAndAllowances", {
      getEmployeeSalariesAndAllowancesDataByEmployeeId: "getDataByEmployeeId"
    }),

    generate() {
      if (this.$refs.form.validate()) {
        this.getEmployeeSalariesAndAllowancesDataByEmployeeId(
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
          })
          .catch(err => console.log(err));
      }
    },

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