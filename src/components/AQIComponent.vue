<template>
    <v-container>
        <AQITableComponent :aqiList="aqiDataList" />
        <!-- <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            City
                        </th>
                        <th class="text-left">
                            Current AQI
                        </th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in aqiDataList"
                    :key="item.lastUpdated"
                    >
                        <td>{{ item.city }}</td>
                        <td>{{ item.aqi }}</td>
                        <td>{{ item.lastUpdated }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table> -->
    </v-container>
</template>

<script>
import AQITableComponent from './AQITableComponent';

export default {
    name: 'AQIComponent',
    components: {
        AQITableComponent
    },
    data: function () {
        return {
            connection: null,
            aqiDataList: []
        };
    },
    mounted() {
    
    },
    methods: {
        
    },
    created: function () {
        console.log("Starting connection to WebSocket Server");
        this.connection = new WebSocket("wss://city-ws.herokuapp.com");

        this.connection.onmessage = (event) => {
            //console.log(event.data);
            let aqiDataString = event.data;
            this.aqiDataList = [];

            let parsedData = JSON.parse(aqiDataString);

            parsedData.forEach((aqiData) => {
                let aqi = aqiData.aqi;
                let aqiCategory, aqiCategoryColor, aqiCategoryColorClass;

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

                this.aqiDataList.push({
                    city: aqiData.city,
                    aqi: parseFloat(aqiData.aqi).toFixed(2),
                    aqiCategory: aqiCategory,
                    aqiCategoryColor: aqiCategoryColor,
                    aqiCategoryColorClass: aqiCategoryColorClass,
                    lastUpdated: Date.now()
                });
            });

            //console.log(this.aqiDataList);
        };

        this.connection.onopen = function (event) {
            console.log(event);
            console.log("Successfully connected to the echo websocket server...");
        };
    },
}
</script>