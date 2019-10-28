<template>
  <v-card>
    <v-card-title class="headline grey darken-3 white--text">
      <span>
        <v-icon class="white--text">{{ formIcon }}</v-icon>
        {{ formTitle }}
      </span>
    </v-card-title>

    <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.compensation_range_from"
                :rules="validateItem.compensationRangeFromRules"
                label="Compensation Range From"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.compensation_range_to"
                :rules="validateItem.compensationRangeToRules"
                label="Compensation Range To"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.tax_amount"
                :rules="validateItem.taxAmountRules"
                label="Tax Amount"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="formData.tax_percentage"
                :rules="validateItem.taxPercentageRules"
                label="Tax Percentage"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-select
                :items="getPayFrequencyList"
                item-text="name"
                item-value="id"
                v-model="formData.pay_frequency_id"
                :rules="validateItem.payFrequencyRules"
                label="Pay Frequency"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" type="submit" flat :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Index from "./Index";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Index
  },

  data: () => ({
    defaultFormData: {
      compensation_range_from: "",
      compensation_range_to: "",
      tax_amount: "",
      tax_percentage: "",
      pay_frequency_id: ""
    },
    formType: "new",
    formData: {
      compensation_range_from: "",
      compensation_range_to: "",
      tax_amount: "",
      tax_percentage: "",
      pay_frequency_id: ""
    },
    valid: true,
    validateItem: {
      compensationRangeFromRules: [
        v => !!v || "Compensation Range From is required"
      ],
      compensationRangeToRules: [
        v => !!v || "Compensation Range To is required"
      ],
      taxAmountRules: [
        v => !!v || "Tax Amount is required"
      ],
      taxPercentageRules: [
        v => !!v || "Tax Percentage is required"
      ],
      payFrequencyRules: [
        v => !!v || "Pay Frequency is required"
      ]
    }
  }),

  computed: {
    ...mapGetters("withholdingTaxTables", ["getWithholdingTaxTableById"]),
    ...mapGetters("payFrequencies", ["getPayFrequencyList"]),
    formTitle() {
      return this.formType === "new" ? "New Withholding Tax" : "Edit Withholding Tax";
    },
    formIcon() {
      return this.formType === "new" ? "add_box" : "edit";
    }
  },

  mounted() {
    this.getWithholdingTaxTableData();
  },

  created() {
    this.getPayFrequenciesData();
  },

  methods: {
    ...mapActions("alerts", ["setAlert"]),
    ...mapActions("payFrequencies", {getPayFrequenciesData: "getData"}),
    ...mapActions("withholdingTaxTables", {
      getWithholdingTaxTableData: "getData",
      saveWithholdingTaxTableData: "saveData",
      updateWithholdingTaxTableData: "updateData",
      deleteWithholdingTaxTableData: "deleteData"
    }),

    editItem(id) {
      let data = this.getWithholdingTaxTableById(id);
      this.formData.id = data.id;
      this.formData.compensation_range_from = data.compensation_range_from;
      this.formData.compensation_range_to = data.compensation_range_to;
      this.formData.tax_amount = data.tax_amount;
      this.formData.tax_percentage = data.tax_percentage;
      this.formData.pay_frequency_id = data.pay_frequency_id;
      this.formType = "update";
    },

    deleteItem(id) {
      this.deleteWithholdingTaxTableData(id)
        .then(response => {
          let obj = {
            alert: true,
            type: "success",
            message: response.data.message
          };
          this.setAlert(obj);
        })
        .catch(err => console.log(err));
    },

    close() {
      this.$emit("setDialog", false);
      this.formType = "new";
      setTimeout(() => {
        this.formData = Object.assign({}, this.defaultFormData);
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.formType === "new") {
          this.saveWithholdingTaxTableData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };
              this.setAlert(obj);
            })
            .catch(err => console.log(err));
        } else if (this.formType === "update") {
          this.updateWithholdingTaxTableData(this.formData)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: response.data.message
              };
              this.setAlert(obj);
            })
            .catch(err => console.log(err));
        }
        this.close();
      }
    }
  }
};
</script>