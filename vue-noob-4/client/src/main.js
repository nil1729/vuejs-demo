import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history',
});
new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
