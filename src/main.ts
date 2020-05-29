import './assets/css/index.less';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iview from 'view-design';

Vue.config.productionTip = false;
Vue.use(iview);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
