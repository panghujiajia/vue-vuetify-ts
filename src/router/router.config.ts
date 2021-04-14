import { RouteConfig } from 'vue-router';
import Main from '../layout/Main.vue';

import UserRoute from './modules/User.route';
import HomeRoute from './modules/Home.route';

export const constantRouterMap: RouteConfig[] = [
	{
		name: 'login',
		path: '/login',
		// route level code-splitting
		// this generates a separate chunk (login.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		name: '404',
		path: '/404',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/404.vue'),
	},
	{
		name: '403',
		path: '/403',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/403.vue'),
	},
];

export const asyncRouterMap: RouteConfig[] = [
	{
		name: '管理系统',
		path: '/',
		redirect: 'home/index',
		component: Main,
		meta: {
			role: ['root'],
			title: '管理系统',
		},
		children: [...HomeRoute, ...UserRoute],
	},
];
