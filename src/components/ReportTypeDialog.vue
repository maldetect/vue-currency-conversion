<template>
    <v-row justify="space-around">
      
  
      <v-col cols="auto">
        
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="showDialog"
        >

          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Select the type of the report</v-toolbar>
              <v-card-text>
                <v-combobox
              v-model="select"
              :items="items"
              label="Report type"
              chips
              
              required
              
            ></v-combobox>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="close"
                >Close</v-btn>
                <v-btn
                  text
                  @click="save()"
                >Save</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </template>

  <script>
  export default {
    name:"ReportTypeDialig",
    props:['showDialog'],
    data(){
        return {
            items: ['One Year, Interval: Monthly', 'Six Months, Interval: Weekly', 'One Month, Interval: Daily'],
            select:'',
            
        }
    },
    methods:{
        save(){
            this.$emit('save', this.select)
            
        },
        close(){
            this.$emit('closeDialog')
        }
    }
  }
  </script>