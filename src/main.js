import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export const serverBus = new Vue();
