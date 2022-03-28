import Vue from "vue";
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


import App from "./App.vue";
import router from "./router";
import store from "./store";

import addressfinder from './utils/addressfinder';

addressfinder.initialise();

Vue.config.productionTip = false;

Vue.use(VueFormWizard)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
