import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('bg-color', {
  bind(el) {
    el.style.backgroundColor = 'cyan'
  }
});

Vue.directive('bg-user-color', {
  bind(el, binding) {
    el.style.backgroundColor = binding.value;
  }
});

Vue.directive('bg-color-arg', {
  bind(el, binding) {
    if (binding.arg == 'background') {
      el.style.backgroundColor = binding.value;
    } else {
      el.style.color = binding.value;
    }
  }
});

Vue.directive('bg-color-mod', {
  bind(el, binding) {
    let delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 5000;
    }
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }, delay);
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')