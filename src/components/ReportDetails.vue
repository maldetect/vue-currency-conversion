<template>
    <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Details</v-toolbar-title>
          
         
        </v-toolbar>
        <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading"
            ></v-progress-circular>
        <v-simple-table v-else>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Start Date
          </th>
          <th class="text-left">
            End Date
          </th>
          <th class="text-left">
            Currency
          </th>
          <th class="text-left">
            Change
          </th>
          <th class="text-left">
            Change(%)
          </th>
          <th class="text-left">
            Start Rate
          </th>
          <th class="text-left">
            End Rate
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in details" >
        <tr
          v-for="(detail, index) in item.quotes"
          :key="index+item.id"
        >
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ index }}</td>
          <td>{{ detail.change }}</td>
          <td>{{ detail.change_pct }}</td>
          <td>{{ detail.start_rate }}</td>
          <td>{{ detail.end_rate }}</td>
        </tr>
        </template>
      </tbody>
    </template>
  </v-simple-table>
    </v-card>
    
</template>

<script>
import axios from 'axios';

export default {
    name: "ReportDetails",
    props:['reportID'],
    data (){
        return {
            details : [],
            loading:false,
        }
    },
    watch:{
        reportID(){
            this.fetchReportDetails()
        }
    },
    created(){
        this.fetchReportDetails()
    },
    methods:{
        close(){
            this.$emit('close')
        },
        fetchReportDetails(){
            this.loading = true
            this.details = []
            axios.get('/api/reports/details/'+this.reportID).then((data) =>{
                this.details = data?.data?.data
                this.loading = false
            }).catch((err)=>{
                this.$toast.error(err.response.data?.message)
                this.loading = false
        });
        }
    }
}
</script>