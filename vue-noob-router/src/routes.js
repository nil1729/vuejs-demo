import Home from '@/components/pages/Home.vue';
import About from '@/components/pages/About.vue';
import User from '@/components/pages/User.vue';
import UserStart from '@/components/User/UserStart.vue';
import UserDetail from '@/components/User/UserDetail.vue';
import UserEdit from '@/components/User/UserEdit.vue';
import Navbar from '@/components/layouts/Navbar.vue';
import NotFound from '@/components/pages/404.vue';
export const routes = [
	{
		path: '/',
		name: 'Home',
		components: {
			default: Home,
			'navbar-top': Navbar,
		},
	},
	{
		name: 'About',
		path: '/about',
		components: {
			default: About,
			'navbar-top': Navbar,
		},
	},
	{
		path: '/user',
		children: [
			{
				path: '',
				component: UserStart,
			},
			{
				path: ':id',
				component: UserDetail,
				name: 'userDetail',
			},
			{
				path: ':id/edit',
				component: UserEdit,
				name: 'userEdit',
			},
		],
		components: {
			default: User,
			'navbar-bottom': Navbar,
		},
	},
	{
		path: '/redirect-me',
		redirect: { name: 'Home' },
	},
	{
		path: '*',
		component: NotFound,
	},
];
