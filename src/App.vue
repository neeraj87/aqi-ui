<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title class="headline">
          <span>AQI Dashboard</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/neeraj87/electron-memory-game"
        target="_blank"
        text
      >
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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
