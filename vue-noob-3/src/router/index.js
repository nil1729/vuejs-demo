import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import AddEmployee from '../views/Add';
import ViewEmployee from '../views/About';
import EditEmployee from '../views/Edit';
import Auth from '../views/Auth';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/add',
		name: 'AddEmployee',
		component: AddEmployee,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/view/:id',
		name: 'ViewEmployee',
		component: ViewEmployee,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/edit/:id',
		name: 'EditEmployee',
		component: EditEmployee,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/auth',
		name: Auth,
		component: Auth,
		meta: { requiresGuest: true },
	},
];

const router = new VueRouter({
	routes,
	mode: 'history',
});
import { firebaseApp } from '@/firebase';

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (firebaseApp.auth().currentUser) {
			next();
		} else {
			next({
				path: '/auth',
				query: { redirect: to.fullPath.split('/')[1] },
			});
		}
	} else if (to.matched.some(record => record.meta.requiresGuest)) {
		if (firebaseApp.auth().currentUser) {
			next({
				path: from.fullPath,
				query: { redirect: to.fullPath.split('/')[1] },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
