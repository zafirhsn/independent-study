import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
  data: {
    username: '',
    authenticated: false,
    name: '',
    backendAddress: 'http://localhost:3000',
    mylistings: [],
    alllistings: []

  }
}).$mount('#app')
