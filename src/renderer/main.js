import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import ELEMENT from 'element-ui';
Vue.use(ELEMENT);

import '@/assets/css/scrollbar.css'
import '@/assets/css/main.css'
import '@/assets/css/my.css'

import filters from './assets/js/filters';
Vue.use(filters)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
let app= new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
export default app;
