<template>
  <v-container>
    <navigation-drawer></navigation-drawer>
    <app-bar></app-bar>
    <v-main>
      <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <report-details @close="close" :reportID="reportID"></report-details>
      </v-dialog>
      <template>
        <v-card>
          <v-card-title>
            Reports
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="reports"
            :search="search"
            :loading="loading"
          >
          <template v-slot:item.actions="{ item }">
      <v-icon v-if="item.status=='Ready'"
        small
        class="mr-2"
        @click="showDetails(item)"
      >
        mdi-view-list
      </v-icon>
      
    </template>
    <template v-slot:no-data>
      <p>No data found</p>>
    </template>
        </v-data-table>
        </v-card>
      </template>
    </v-main>
  </v-container>
</template>
<script>
import AppBar from "../components/AppBar";
import NavigationDrawer from "../components/NavigationDrawer";
import axios from 'axios';
import ReportDetails from '../components/ReportDetails.vue';

export default {
  name: "Home",
  components: { AppBar, NavigationDrawer,ReportDetails },
  data () {
      return {
        loading: false,
        search: '',
        headers: [
          { text: 'Currencies', value: 'currencies' },
          { text: 'Amount', value: 'amount' },
          { text: 'Type', value: 'type' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        reports: [],
        dialog:false,
        reportID:0,
      }
    },
    created(){
      this.fetchReportRequests()
    },
    methods:{
      fetchReportRequests(){
        axios
        .get("/api/reports").then(({ data }) => {
          this.loading =false
          this.reports = data?.data;
        }).catch((err)=>{
          this.$toast.error(err.response.data?.message)
          this.loading = false
        });
      },
      showDetails(item){
        this.reportID = item.id;
        this.dialog = true;
      },
      close(){
        this.dialog =false;
      }
    }
};
</script>
