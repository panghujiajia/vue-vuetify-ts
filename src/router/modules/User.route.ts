import { RouteConfig } from 'vue-router';
import PageView from '@/views/PageView.vue';

const routes: RouteConfig[] = [
	{
		name: 'user',
		path: 'user',
		component: PageView,
		meta: {
			icon: 'mdi-account',
			role: ['user'],
			title: '用户管理',
		},
		children: [
			{
				name: 'list',
				path: 'list',
				component: () =>
					import(
						/* webpackChunkName: "user" */ '@/views/User/UserList.vue'
					),
				meta: {
					icon: 'mdi-account',
					role: ['user:list'],
					title: '用户列表',
				},
			},
			{
				name: 'add',
				path: 'add',
				component: () =>
					import(
						/* webpackChunkName: "user" */ '@/views/User/AddUser.vue'
					),
				meta: {
					role: ['user:add'],
					title: '添加用户',
					breadcrumb: [
						{ title: '用户列表' },
						{ title: '添加用户', disabled: true },
					],
				},
			},
		],
	},
];
export default routes;
