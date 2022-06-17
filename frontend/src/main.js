import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/Skeleton-2.0.4/css/skeleton.css'
import './assets/Skeleton-2.0.4/css/normalize.css'
import './assets/css/main.css';

Vue.config.productionTip = false

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
