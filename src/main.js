import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// require('./plugins/fontawesome');
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faCheckCircle,faExclamationCircle,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
library.add(faUserSecret,faCheckCircle,faExclamationCircle,faTimes )
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue,IconsPlugin,FontAwesomeIcon);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
