<template>
  <v-container>
    <navigation-drawer></navigation-drawer>
    <app-bar></app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-combobox
              v-model="select"
              :items="items"
              label="Select Up to Five currency"
              multiple
              chips
              :loading="loadingCurrencies"
              :error-messages="selectErrors"
              required
              @input="$v.select.$touch()"
              @blur="$v.select.$touch()"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Amount"
              v-model="amount"
              value="10.00"
              prefix="$"
              type="number"
              :error-messages="amountErrors"
              required
              @input="$v.amount.$touch()"
              @blur="$v.amount.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn depressed color="primary" @click="convert"> Convert </v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="openDialog">Request a Report</v-btn>
            <report-type-dialog
              @save="save"
              :showDialog="showDialog"
              @closeDialog="closeDialog"
            ></report-type-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loadingConvertion"
            ></v-progress-circular>
            <conversion-table v-else :items="result"></conversion-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AppBar from "../components/AppBar";
import NavigationDrawer from "../components/NavigationDrawer";
import axios from "axios";
import ConversionTable from "../components/Util/ConversionTable.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import ReportTypeDialog from "../components/ReportTypeDialog.vue";

export default {
  name: "Home",
  components: { AppBar, NavigationDrawer, ConversionTable, ReportTypeDialog },
  mixins: [validationMixin],
  data() {
    return {
      select: [],
      items: [],
      result: [],
      amount: 0,
      loadingCurrencies: false,
      loadingConvertion: false,
      errorMessage: {},
      showDialog: false,
    };
  },
  watch: {
    select(newValue, oldValue) {
      if (newValue.length > 5) {
        this.$nextTick(() => {
          this.select = oldValue;
        });

        this.$toast.info("You can not select more than 5 currencies!");
      }
    },
  },
  validations: {
    select: {
      required,
      serverFailed() {
        return !this.hasServerError("currencies");
      },
    },
    amount: {
      required,
      moreThanZero() {
        return this.amount > 0;
      },
      serverFailed() {
        return !this.hasServerError("currencies");
      },
    },
  },
  computed: {
    selectErrors: {
      get() {
        const errors = [];
        if (!this.$v.select.$dirty) return errors;

        !this.$v.select.required && errors.push("Currencies is required.");

        !this.$v.select.serverFailed &&
          errors.push(this.errorMessage.currencies.join(" "));
        delete this.errorMessage?.currencies;
        return errors;
      },
    },

    amountErrors: {
      get() {
        const errors = [];
        if (!this.$v.amount.$dirty) return errors;

        !this.$v.amount.required && errors.push("Amount is required.");
        !this.$v.amount.moreThanZero &&
          errors.push("Amount must be more than zero");
        !this.$v.amount.serverFailed &&
          errors.push(this.errorMessage.amount.join(" "));
        delete this.errorMessage?.amount;
        return errors;
      },
    },
  },
  created() {
    this.fetchCurrencies();
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
    hasServerError(field) {
      if (Object.prototype.hasOwnProperty.call(this.errorMessage, field))
        return true;
      else {
        return false;
      }
    },
    fetchCurrencies() {
      this.loadingCurrencies = true;
      axios
        .get("/api/currencies")
        .then(({ data }) => {
          this.loadingCurrencies = false;
          Object.keys(data?.data?.currencies).forEach((key) => {
            this.items.push({
              text: data.data.currencies[key],
              value: key,
            });
          });
        })
        .catch(() => {
          this.loadingCurrencies = false;
        });
    },
    openDialog() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Check Errors!");
        return;
      }
      this.showDialog = true;
    },
    save(type) {
      this.showDialog = false;
      axios
        .post("/api/reports", {
          type: type,
          currencies: this.select.map(item => item.value).join(','),
          amount: this.amount,
        })
        .then(({ data }) => {
          this.$toast.info(data.response.metadata?.message);
        })
        .catch((err) => {
          this.$toast.error(err.response.data?.message);
        });
    },
    convert() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Check Errors!");
        return;
      }
      this.loadingConvertion = true;
      axios
        .post("/api/currencies/convert", {
          currencies: this.select.map((e) => e.value),
          amount: this.amount,
        })
        .then(({ data }) => {
          this.loadingConvertion = false;
          this.result = data?.data;
        })
        .catch((err) => {
          this.$toast.error(err.response.data?.message);
          this.loadingConvertion = false;
        });
    },
  },
};
</script>
