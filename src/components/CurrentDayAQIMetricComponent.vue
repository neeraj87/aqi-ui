<template>
  <v-row>
    <v-col cols="12" md="6" lg="6" xl="6" sm="12" xs="12">
      <v-card elevation="2">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require('../assets/clean-city.jpg')"
        >
          <v-card-title class="black--text">City with best air quality</v-card-title>
        </v-img>

        <section v-if="error">
          <v-card-text class="text--primary">
            <v-alert
              type="error"
            >
              We're sorry, we're not able to retrieve this information at the moment, please try back later.
            </v-alert>
          </v-card-text>
        </section>

        <div v-if="loading" class="text-center">
          <v-progress-circular
            :width="3"
            color="red"
            indeterminate
          ></v-progress-circular>
        </div>

        <div v-if="!loading && !error">
          <v-card-text class="text--primary">
            <div>{{ goodAQI.city }}</div>
            <div>AQI: {{ goodAQI.aqi }}</div>
            <div>Last Updated: {{ formatDate(goodAQI.lastUpdated) }}</div>
          </v-card-text>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="6" xl="6" sm="12" xs="12">
      <v-card elevation="2">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require('../assets/polluted-city.jpg')"
        >
          <v-card-title class="black--text">City with worst air quality</v-card-title>
        </v-img>

        <section v-if="error">
          <v-card-text class="text--primary">
            <v-alert
              type="error"
            >
              We're sorry, we're not able to retrieve this information at the moment, please try back later.
            </v-alert>
          </v-card-text>
        </section>

        <div v-if="loading" class="text-center">
          <v-progress-circular
            :width="3"
            color="red"
            indeterminate
          ></v-progress-circular>
        </div>

        <div v-if="!loading && !error">
          <v-card-text class="text--primary">
            <div>{{ poorAQI.city }}</div>
            <div>AQI: {{ poorAQI.aqi }}</div>
            <div>Last Updated: {{ formatDate(poorAQI.lastUpdated) }}</div>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "CurrentDayAQIMetricComponent",
  data() {
    return {
      loading: true,
      error: false,
      poorAQI: {},
      goodAQI: {},
    };
  },
  methods: {
    formatDate(value) {
      return moment(value).format("DD, MMM YYYY hh:mm a");
    },
  },
  mounted() {
    let config = {
      headers: {
        "api-token": process.env.VUE_APP_API_KEY,
      },
    };

    axios
      .get(`${process.env.VUE_APP_API_URL}/api/v1/min-max-aqi`, config)
      .then((response) => {
        this.goodAQI = response.data.minAQI ? response.data.minAQI[0] : null;
        this.poorAQI = response.data.maxAQI ? response.data.maxAQI[0] : null;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      })
      .finally(() => (this.loading = false));
  },
};
</script>