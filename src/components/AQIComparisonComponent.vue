<template>
    <v-card elevation="2">
        <v-card-title>Current Day AQI Comparison</v-card-title>
        <v-row class="pl-5 pr-5">
            <v-col cols="12" sm="12" md="6" lg="6" xs="12">
                <v-select
                :items="cities"
                label="Select City"
                item-text="label"
                item-value="value"
                v-model="selectedCity1"
                @change="compareCityAQI"
                outlined
                ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6" xs="12">
                <v-select
                :items="cities"
                label="Select City"
                item-text="label"
                item-value="value"
                v-model="selectedCity2"
                @change="compareCityAQI"
                outlined
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xs="12">
                <div v-if="datacollection">
                    <bar-chart :chartData="datacollection" :height="barChartHeight"></bar-chart>
                </div>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";

import BarChart from "./BarChart.js";

export default {
    name: "AQIComparisonComponent",
    components: {
        BarChart,
    },
    data() {
        return {
            barChartHeight: 150,
            datacollection: null,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
            selectedCity1: "",
            selectedCity2: "",
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
        };
    },
  methods: {
    async compareCityAQI() {
      let labels = [];
      let datasets = [];
      let dataSetData1 = [];
      let dataSetData2 = [];

      let config = {
        headers: {
          "api-token": process.env.VUE_APP_API_KEY,
        },
      };

      if (this.selectedCity1) {
        let queryParam = "city=" + this.selectedCity1;

        let selectedCity1AQIData = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/get-aqi-data?` + queryParam,
          config
        );

        selectedCity1AQIData.data.forEach((aqiData) => {
          if (
            labels.indexOf(
              moment(aqiData.lastUpdated).format("DD, MMM YYYY hh:mm a")
            ) < 0
          ) {
            labels.push(
              moment(aqiData.lastUpdated).format("DD, MMM YYYY hh:mm a")
            );
          }

          dataSetData1.push(aqiData.aqi);
        });

        datasets.push({
          data: dataSetData1,
          label: this.selectedCity1,
          backgroundColor: "#329932",
        });
      }

      if (this.selectedCity2) {
        let queryParam2 = "city=" + this.selectedCity2;

        let selectedCity2AQIData = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/get-aqi-data?` + queryParam2,
          config
        );

        selectedCity2AQIData.data.forEach((aqiData) => {
          if (
            labels.indexOf(
              moment(aqiData.lastUpdated).format("DD, MMM YYYY hh:mm a")
            ) < 0
          ) {
            labels.push(
              moment(aqiData.lastUpdated).format("DD, MMM YYYY hh:mm a")
            );
          }
          dataSetData2.push(aqiData.aqi);
        });

        datasets.push({
          data: dataSetData2,
          label: this.selectedCity2,
          backgroundColor: "#bf0000",
        });
      }

      this.datacollection = {
        labels: labels,
        datasets: datasets,
      };
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
