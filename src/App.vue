<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title class="headline">
          <span>Air Quality Index (AQI) Dashboard</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main>
      <AQIComponent/>
    </v-main>

  </v-app>
</template>

<script>
import AQIComponent from "./components/AQIComponent";

export default {
  name: 'App',
  metaInfo: {
    title: 'AQI Dashboard'    
  },
  components: {
    AQIComponent
  },
  data: () => ({
    //
  }),
};
</script>
