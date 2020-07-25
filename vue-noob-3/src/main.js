import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { firebaseApp } from '@/firebase';

Vue.config.productionTip = false;

let app;

firebaseApp.auth().onAuthStateChanged(function() {
	if (!app) {
		app = new Vue({
			router,
			render: h => h(App),
		}).$mount('#app');
	}
});
