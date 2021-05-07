<template>
    <v-container>
        <v-card
        elevation="2"
        >
            <v-card-title>Real time Air Quality Index (AQI)</v-card-title>
            <template>
                <div class="text-center">
                    <v-chip
                    class="ma-2"
                    x-small
                    color="#329932"
                    >
                    Good
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    x-small
                    color="#66b266"
                    >
                    Satisfactory
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    x-small
                    color="#ffcf40"
                    >
                    Moderate
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    x-small
                    color="#f37735"
                    text-color="white"
                    >
                    Poor
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    x-small
                    color="#bf0000"
                    text-color="white"
                    >
                    Very Poor
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    x-small
                    color="#800000"
                    text-color="white"
                    >
                    Severe
                    </v-chip>
                </div>
            </template>

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Current AQI</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in aqiList"
                        :key="item.id"
                        >
                            <td>{{ item.city }}</td>
                            <td>
                                <font :color="item.aqiCategoryColor">{{ item.aqi }}</font>
                            </td>
                            <td>{{ item.lastUpdated }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
        
    </v-container>
</template>

<script>


export default {
    name: 'AQITableComponent',
    props: ['aqiList'],
    data: function () {
        return {
           
        };
    },
    methods: {
    }
}
</script>

<style>
    .good-aqi {
        color: "#329932" !important;
    }

    .satisfactory-aqi {
        color: "#66b266";
    }

    .moderate-aqi {
        color: "#ffcf40";
    }

    .poor-aqi {
        color: "#f37735";
    }

    .very-poor-aqi {
        color: "#bf0000";
    }

    .severe-aqi {
        color: "#800000";
    }
</style>