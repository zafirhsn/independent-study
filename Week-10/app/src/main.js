import Vue from 'vue';
import App from './app.vue';

import Header from './components/header.vue'

Vue.component("app-header", Header)

new Vue({
  el: "#app",
  render: h => h(App)

});