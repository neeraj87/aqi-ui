import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import VueToastr from "vue-toastr";

Vue.config.productionTip = false

Vue.use(VueMeta);
Vue.use(VueToastr);

new Vue({
  vuetify,
  render: h => h(App),
  mounted() {
    // You are able to access plugin from everywhere via this.$toastr
    this.$toastr.defaultPosition = "toast-top-left";
  }
}).$mount('#app')
