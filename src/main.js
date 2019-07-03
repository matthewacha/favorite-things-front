/* eslint-disable import/prefer-default-export */
import '@babel/polyfill';
import Vue from 'vue';
import Notifications from 'vue-notification';
import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export const serverBus = new Vue();
