<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title>Live AQI Trend</v-card-title>
      <line-chart 
        :chartData="lineChartDataCollection" :options="lineChartOptions"
      ></line-chart>
    </v-card>

    <v-img
      class="mt-2"
      height="100%"
      :src="require('../assets/what-is-aqi.jpg')"
    ></v-img>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  name: "AQIChartComponent",
  props: ["aqiLineChartData"],
  components: {
    LineChart
  },
  data() {
    return {
      lineChartDataCollection: null,
      lineChartOptions: {
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
    };
  },
  created() {
    this.lineChartDataCollection = {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Indore",
          borderColor: "#f37735",
          fill: false,
        }
      ]
    }
  },
  watch: {
    aqiLineChartData: {
      immediate: true,
      handler(newValue) {
        // if the array length becomes more than 20 then remove the first element so keep the data fresh
        //this is just a temporary front-end solution as compared to paginated chart data
        if(this.lineChartDataCollection.labels.length > 20) {
          this.lineChartDataCollection.labels.shift();
          this.lineChartDataCollection.datasets[0].data.shift();
        }

        if(this.lineChartDataCollection.labels.indexOf(newValue.lastUpdatedTime) < 0) {
          this.lineChartDataCollection.labels.push(newValue.lastUpdatedTime);
        }
        
        let lastUpdatedTimeIndex = this.lineChartDataCollection.labels.indexOf(newValue.lastUpdatedTime);
        this.lineChartDataCollection.datasets[0].data[lastUpdatedTimeIndex] = newValue.data;
      }
      
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
