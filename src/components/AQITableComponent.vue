<template>
    <v-container>
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
                    :key="item.lastUpdated"
                    >
                        <td>{{ item.city }}</td>
                        <td>
                            <p :class="item.aqiCategoryColorClass">{{ item.aqi }}</p>
                        </td>
                        <td>{{ item.lastUpdated }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
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
}
</script>

<style>
    .good-aqi {
        color: "#329932";
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