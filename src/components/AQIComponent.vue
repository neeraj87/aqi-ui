<template>
    <v-row>
        <v-col
            class="mb-2 mt-2 pl-5 pr-5"
            cols="12"
            md="12" lg="12" xl="12" sm="12"
        >
            <CurrentDayAQIMetricComponent />
        </v-col>

        <v-col
            class="mb-2 pl-5 pr-5"
            cols="12"
            md="12" lg="12" xl="12" sm="12"
        >
            <AQITableComponent :aqiList="aqiDataList" />
        </v-col>

        <!-- <v-col
            class="mb-2"
            cols="12"
            md="12" lg="6" xl="6" sm="12"
        >
            <AQIChartComponent :aqiLineChartData="aqiLineChartData"/>
        </v-col> -->

        <v-col
            class="mb-2 pl-5 pr-5"
            cols="12"
            md="12" lg="12" xl="12" sm="12" xs="12"
        >
            <AQIComparisonComponent />
        </v-col>

        <v-col
            class="mb-5 pl-5 pr-5"
            cols="12"
            md="12" lg="12" xl="12" sm="12" xs="12"
        >
            <HistoricAQIComponent />
        </v-col>
    </v-row>
</template>

<script>
var uniqid = require('uniqid');
import moment from 'moment';

import AQITableComponent from './AQITableComponent';
// import AQIChartComponent from './AQIChartComponent';
import AQIComparisonComponent from './AQIComparisonComponent';
import HistoricAQIComponent from './HistoricAQIComponent';
import CurrentDayAQIMetricComponent from './CurrentDayAQIMetricComponent';

export default {
    name: 'AQIComponent',
    components: {
        AQITableComponent,
        AQIComparisonComponent,
        HistoricAQIComponent,
        CurrentDayAQIMetricComponent
    },
    data: function () {
        return {
            connection: null,
            aqiDataList: [],
            aqiLineChartData: {}
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
    created: function () {
        let lastTimestampOfAQIPing = null;
        console.log("Starting connection to WebSocket Server");
        this.connection = new WebSocket("wss://city-ws.herokuapp.com");

        this.aqiDataList = [];
        this.connection.onmessage = (event) => {
            let currentUnixTime = moment().valueOf();
            let aqiDataString = event.data;
            
            let parsedData = JSON.parse(aqiDataString);

            parsedData.forEach((aqiData) => {
                let aqi = aqiData.aqi;
                let aqiCategory, aqiCategoryColor, aqiCategoryColorClass;
                
                //City of Indore was chosen for AQI trend because it has the most variable data
                // where the AQI value shows variations +2 and -2 points from the base line of ~50
                // due to this variation we can see the trend over a period of time
                if(aqiData.city === 'Indore') {
                    if(lastTimestampOfAQIPing == null) {
                        lastTimestampOfAQIPing = currentUnixTime;
                        this.aqiLineChartData = {
                            lastUpdatedTime: moment(Date.now()).format("h:mm a"),
                            data: parseFloat(aqiData.aqi).toFixed(2)
                        }
                    } else {
                        if(moment(currentUnixTime).diff(moment.utc(lastTimestampOfAQIPing), 'minutes') > 5) {
                            lastTimestampOfAQIPing = currentUnixTime;
                            this.aqiLineChartData = {
                                lastUpdatedTime: moment(Date.now()).format("h:mm a"),
                                data: parseFloat(aqiData.aqi).toFixed(2)
                            }
                        }
                    }
                }

                if (aqi <= 50) {
                    aqiCategory = "Good";
                    aqiCategoryColor = "#329932";
                    aqiCategoryColorClass = 'good-aqi';
                } else if (aqi > 50 && aqi <= 100) {
                    aqiCategory = "Satisfactory";
                    aqiCategoryColor = "#66b266";
                    aqiCategoryColorClass = 'satisfactory-aqi';
                } else if (aqi > 100 && aqi <= 200) {
                    aqiCategory = "Moderate";
                    aqiCategoryColor = "#ffcf40";
                    aqiCategoryColorClass = 'moderate-aqi';
                } else if (aqi > 200 && aqi <= 300) {
                    aqiCategory = "Poor";
                    aqiCategoryColor = "#f37735";
                    aqiCategoryColorClass = 'poor-aqi';
                } else if (aqi > 300 && aqi <= 400) {
                    aqiCategory = "Very Poor";
                    aqiCategoryColor = "#bf0000";
                    aqiCategoryColorClass = 'very-poor-aqi';
                } else if (aqi > 400 && aqi <= 500) {
                    aqiCategory = "Severe";
                    aqiCategoryColor = "#800000";
                    aqiCategoryColorClass = 'severe-aqi';
                }

                if(!this.aqiDataList.some(item => item.city === aqiData.city)) {
                    this.aqiDataList.push({
                        id: uniqid(),
                        city: aqiData.city,
                        aqi: parseFloat(aqiData.aqi).toFixed(2),
                        aqiCategory: aqiCategory,
                        aqiCategoryColor: aqiCategoryColor,
                        aqiCategoryColorClass: aqiCategoryColorClass,
                        lastUpdated: moment(Date.now()).format("DD/MM/YYYY, h:mm a")
                    });
                } else {
                    let existingAQIData = this.aqiDataList.find(item => item.city === aqiData.city);
                    existingAQIData.aqi = parseFloat(aqiData.aqi).toFixed(2);
                    existingAQIData.aqiCategory = aqiCategory;
                    existingAQIData.aqiCategoryColor = aqiCategoryColor;
                    existingAQIData.aqiCategoryColorClass = aqiCategoryColorClass;
                    existingAQIData.lastUpdated = moment(Date.now()).format("DD/MM/YYYY, h:mm a");
                }
                
            });
        };

        this.connection.onopen = function (event) {
            console.log(event);
            console.log("Successfully connected to the echo websocket server...");
        };
    },
}
</script>