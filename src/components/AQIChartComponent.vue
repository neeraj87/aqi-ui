<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title>Live AQI Comparison</v-card-title>
      <line-chart 
        :chartData="datacollection"
      ></line-chart>
    </v-card>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  name: "AQIChartComponent",
  props: ['aqiLineChartData'],
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [],
      },
      africa: {
        data: [],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false,
      },
      chartOptions: {
        responsive: true,
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
    };
  },
  watch: {
    'aqiLineChartData': {
      immediate: true,
      handler: function(newValue, oldValue) {
        console.log('Prop changed: ', newValue, ' | was: ', oldValue)
        this.datacollection.labels.push(newValue.lastUpdatedTime);

        this.africa.data.push(newValue.data);
        this.datacollection.datasets.push(this.africa);
      },
      deep: true
    }
  }
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
