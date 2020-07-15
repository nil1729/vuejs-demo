import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('toLowerCase', function (value) {
  return value.toLowerCase();
})

Vue.mixin({
  created() {
    console.log('created() from Global Mixin');
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')