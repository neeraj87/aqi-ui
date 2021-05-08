<template>
    <v-row>
        <v-col
            class="mb-5"
            cols="6"
            md="6" lg="6" xl="6" sm="12"
        >
            <v-card
                elevation="2"
            >
                <v-card-title>City with best AQI</v-card-title>

                <section v-if="error">
                    <v-card-text class="text--primary">
                        We're sorry, we're not able to retrieve this information at the moment, please try back later.
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
                        <div>{{goodAQI.city}}</div>
                        <div>AQI: {{goodAQI.aqi}}</div>
                        <div>Last Updated: {{formatDate(goodAQI.lastUpdated)}}</div>
                    </v-card-text>
                </div>
            </v-card>
        </v-col>

        <v-col
            class="mb-5"
            cols="6"
            md="6" lg="6" xl="6" sm="12"
        >
            <v-card
                elevation="2"
            >
                <v-card-title>City with poorest AQI</v-card-title>

                <section v-if="error">
                    <v-card-text class="text--primary">
                        We're sorry, we're not able to retrieve this information at the moment, please try back later.
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
                        <div>{{poorAQI.city}}</div>
                        <div>AQI: {{poorAQI.aqi}}</div>
                        <div>Last Updated: {{formatDate(poorAQI.lastUpdated)}}</div>
                    </v-card-text>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'CurrentDayAQIMetricComponent',
        data() {
            return {
                loading: true,
                error: false,
                poorAQI: {},
                goodAQI: {}
            }
        },
        methods: {
            formatDate(value) {
                return moment(value).format('DD, MMM YYYY HH:mm a')
            }
        },
        mounted() {
            let config = {
                headers: {
                   'api-token': process.env.API_KEY
                }
            };

            axios.get('https://aqi-server.herokuapp.com/api/v1/min-max-aqi', config).then(response => {
                    this.goodAQI = response.data.minAQI ? response.data.minAQI[0] : null;
                    this.poorAQI = response.data.maxAQI ? response.data.maxAQI[0] : null;
                    console.log('good aqi: ' + JSON.stringify(this.goodAQI));
                }).catch(error => {
                    this.error = true;
                    console.log(error);
            }).finally(() => this.loading = false);
        }
    }
</script>