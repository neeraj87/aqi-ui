<template>
  <v-card>
    <v-card-title>Historical AQI Data</v-card-title>
    <v-row class="pl-5 pr-5">
      <v-col cols="12" sm="12" md="6" lg="6" xs="12">
        <v-select
          :items="cities"
          label="Select City"
          item-text="label"
          item-value="value"
          v-model="selectedCity"
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="2" lg="2" xs="12">
        Start Date
        <datepicker placeholder="Select Start Date" v-on:selected="validateSelectedStartDate"></datepicker>
      </v-col>

      <v-col cols="12" sm="12" md="2" lg="2" xs="12">
        End Date
        <datepicker placeholder="Select End Date" v-on:selected="validateSelectedEndDate"></datepicker>
      </v-col>

      <v-col cols="12" sm="12" md="2" lg="2" xs="12">
        <v-btn
          color="primary"
          elevation="2"
          small
          @click="getHistoricAQIData"
        >Apply Filter</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xs="12">
        <div v-if="loading" class="text-center">
          <v-progress-circular
            :width="3"
            color="red"
            indeterminate
          ></v-progress-circular>
        </div>

        <div v-if="!error && !loading">
          <div v-if="!dataNotFoundMessage && datacollection">
            <line-chart :chartData="datacollection" :height="lineChartHeight"></line-chart>
          </div>
          
          <div v-if="dataNotFoundMessage && !datacollection">
            <v-alert
              :type="messageType"
            >
              {{dataNotFoundMessage}}
            </v-alert>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';
import moment from "moment";
import LineChart from "./LineChart.js";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "HistoricAQIComponent",
  components: {
    LineChart,
    Datepicker
  },
  data: () => ({
    messageType: 'info',
    startDate: null,
    endDate: null,
    datacollection: null,
    lineChartHeight: 150,
    dataNotFoundMessage: '',
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        titleFontSize: 20,
        bodyFontSize: 25,
      },
      scales: {
        xAxes: [],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
    error: false,
    loading: false,
    selectedCity: '',
    cities: [
      {
        label: "Mumbai",
        value: "Mumbai",
      },
      {
        label: "Delhi",
        value: "Delhi",
      },
      {
        label: "Bhubaneswar",
        value: "Bhubaneswar",
      },
      {
        label: "Pune",
        value: "Pune",
      },
      {
        label: "Indore",
        value: "Indore",
      },
      {
        label: "Lucknow",
        value: "Lucknow",
      },
      {
        label: "Bengaluru",
        value: "Bengaluru",
      },
      {
        label: "Kolkata",
        value: "Kolkata",
      },
      {
        label: "Chandigarh",
        value: "Chandigarh",
      },
      {
        label: "Chennai",
        value: "Chennai",
      },
      {
        label: "Hyderabad",
        value: "Hyderabad",
      },
      {
        label: "Jaipur",
        value: "Jaipur",
      },
    ]
  }),
  methods: {
    validateSelectedStartDate(value) {
      this.startDate = moment(value).valueOf();
      if(this.endDate && this.startDate > this.endDate) {
        this.$toastr.e("Filter start date cannot be greater than selected end date");
        this.messageType = 'error';
        this.dataNotFoundMessage = 'Filter start date cannot be greater than selected end date';
      } else {
        this.resetMessagesToDefaultState();
      }
    },
    validateSelectedEndDate(value) {
      this.endDate = moment(value).valueOf();
      if(this.startDate && this.endDate < this.startDate) {
        this.$toastr.e("Filter end date cannot be smaller than selected start date");
        this.messageType = 'error';
        this.dataNotFoundMessage = 'Filter end date cannot be smaller than selected start date';
      } else {
        this.resetMessagesToDefaultState();
      }
    },
    resetMessagesToDefaultState() {
      this.messageType = 'info';
      this.dataNotFoundMessage = '';
    },
    getHistoricAQIData() {
      this.loading = true;
      this.resetMessagesToDefaultState();

      if(!this.selectedCity) {
        this.$toastr.e("Please select a city from the dropdown to get the historical AQI data");
        this.messageType = 'error';
        this.loading = false;
        this.dataNotFoundMessage = 'Please select a city from the dropdown to get the historical AQI data';
        return;
      }

      let config = {
        headers: {
          'api-token': process.env.VUE_APP_API_KEY
        }
      };

      let queryParam = 'city=' + this.selectedCity;

      if(this.startDate && this.endDate) {
        queryParam += '&start=' + this.startDate + '&end=' + this.endDate;
      }

      axios.get(`${process.env.VUE_APP_API_URL}/api/v1/get-aqi-data?` + queryParam, config).then(response => {
        this.loading = false;

        let historicAQIData = response.data;

        let labels = [];
        let datasets = [];
        let dataSetData = [];

        if(historicAQIData && historicAQIData.length > 0) {
          
          historicAQIData.forEach(aqiData => {
            labels.push(moment(aqiData.lastUpdated).format("DD, MMM YYYY hh:mm a"));
            dataSetData.push(aqiData.aqi);
          });

          datasets.push({
            data: dataSetData,
            label: this.selectedCity,
            borderColor: "#3e95cd",
            fill: false,
          });

          this.datacollection = {
            labels: labels,
            datasets: datasets
          }
        } else {
          this.dataNotFoundMessage = 'Historic AQI data not found for chosen parameters';
        }
      }).catch(error => {
          this.loading = false;
          this.error = true;
          console.log(error);
      }).finally(() => this.loading = false);
    }
  },
  computed: {
    lineChartStyle() {
      return {
        height: '10vh',
        position: 'relative',
      }
    }
  }
};
</script>