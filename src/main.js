import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Vue.prototype.$http = axios;

Vue.use(Vuetify);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
