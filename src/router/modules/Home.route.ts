import { RouteConfig } from 'vue-router';
import PageView from '@/views/PageView.vue';

const routes: RouteConfig[] = [
	{
		name: 'home',
		path: 'home',
		component: PageView,
		meta: {
			invisible: true,
			role: ['root'],
			title: '主页',
		},
		children: [
			{
				name: 'index',
				path: 'index',
				component: () =>
					import(
						/* webpackChunkName: "home" */ '@/views/Home/Index.vue'
					),
				meta: {
					icon: 'mdi-home',
					role: ['root', 'home:index'],
					title: '主页',
				},
			},
		],
	},
];
export default routes;
