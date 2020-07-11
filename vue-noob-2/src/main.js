import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loader from './components/Loader.vue'
Vue.config.productionTip = false

Vue.component('loader', Loader);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')