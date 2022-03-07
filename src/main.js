import Vue from 'vue';
import VueMask from 'v-mask';
import router from '@/router';

import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import '@/assets/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

Vue.use(VueCompositionAPI);
Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
