import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from 'axios'
// import $ from "jquery";
import moment from 'moment'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

window.axios = axios
window.Endpoint = `http://localhost:5000/api/v1`
// window.$ = $;
window.moment = moment
window.mapState = mapState

window.Swal = Swal
window.Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
