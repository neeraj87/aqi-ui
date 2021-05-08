<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title>Live AQI Comparison</v-card-title>
      <!-- <line-chart 
        :chartData="datacollection"
      ></line-chart> -->
    </v-card>
  </v-container>
</template>

<script>
// import LineChart from "./LineChart.js";

export default {
  name: "AQIChartComponent",
  props: ['aqiLineChartData'],
  components: {
    
  },
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'City',
            borderColor: "#3e95cd",
            fill: false
          }
        ]
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
  created() {
    
  },
  watch: {
    'aqiLineChartData': {
      immediate: true,
      deep: true,
      handler: function(newValue) {
        console.log('Prop changed: ', newValue.lastUpdatedTime, ' and data: ', newValue.data)
        this.datacollection.labels.push(newValue.lastUpdatedTime);
        this.datacollection.datasets[0].data.push(newValue.data);
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
