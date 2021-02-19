import Home from '@/components/pages/Home';
import Auth from '@/components/pages/Auth';
import NotFound from '@/components/pages/404';
export const routes = [
	{
		path: '/',
		component: Home,
		name: 'Home',
		// beforeEnter: (to, from, next) => {
		// 	console.log(to, from, next);
		// 	next();
		// },
	},
	{
		path: '/auth',
		component: Auth,
		name: 'Auth',
		// redirect: '/',
	},
	{
		path: '*',
		component: NotFound,
		name: '404',
	},
];
