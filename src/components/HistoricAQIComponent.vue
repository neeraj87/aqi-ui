<template>
  <v-card>
    <v-card-title>Historic AQI Data</v-card-title>
    <v-row class="pl-5 pr-5">
      <v-col cols="12" sm="12" md="6" lg="6" xs="!2">
        <v-select
          :items="cities"
          label="Select City"
          item-text="label"
          item-value="value"
          v-model="selectedCity"
          @change="getHistoricAQIData"
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="6" xs="12">
        <datepicker placeholder="Select Date"></datepicker>
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
              type="info"
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
    ],
  }),
  methods: {
    getHistoricAQIData(value) {
      this.loading = true;

      let config = {
        headers: {
          'api-token': process.env.VUE_APP_API_KEY
        }
      };

      axios.get('https://aqi-server.herokuapp.com/api/v1/get-aqi-data?city=' + value, config).then(response => {
        this.loading = false;
        this.dataNotFoundMessage = '';

        let historicAQIData = response.data;

        let labels = [];
        let datasets = [];
        let dataSetData = [];

        if(historicAQIData && historicAQIData.length > 0) {
          
          historicAQIData.forEach(aqiData => {
            labels.push(moment(aqiData.lastUpdated).format("DD, MMM YYYY HH:mm a"));
            dataSetData.push(aqiData.aqi);
          });

          datasets.push({
            data: dataSetData,
            label: value,
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