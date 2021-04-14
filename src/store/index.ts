import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import UserVuex from './modules/User.vuex';
import { asyncRouterMap } from '@/router/router.config';
import cloneDeep from 'lodash/cloneDeep';
import { getPermissionRoute } from '@/router';
import { $info } from '@/service/modules/Login.service';

Vue.use(Vuex);

const dataState = createPersistedState({
	storage: window.sessionStorage, // 持久化方式
	paths: ['token', 'userInfo', 'permissions'], // 持久化数据
});
export default new Vuex.Store({
	state: {
		token: '', // token
		spinning: false, // loading状态
		menuList: [], // 左侧菜单 用来渲染
		addRouters: [], // 动态路由
		userInfo: null, // 用户信息
		antConfig: {
			tableSize: 'small', // ant 表格大小 		default | middle | small
			tableBorder: true, // ant 表格边框 			true | false
			inputSize: 'default', // ant 输入框大小 	large | default | small
			buttonSize: 'default', // ant 按钮大小 		large | default | small
			pageSize: 'default', // ant 分页大小		default | middle | small
			pageSizeOptions: ['10', '20', '30', '50', '100'], // ant 分页选项
		},
		permissions: [],
	},
	getters: {},
	mutations: {
		savePermissions(state: any, data: any) {
			state.permissions = data;
		},
		// 保存动态路由和菜单
		setRouters(state: any, data: any) {
			state.menuList = data.length ? data[0].children : [];
			state.addRouters = data.length ? data : [];
		},
		// 保存用户信息
		saveUserInfo(state: any, userInfo: any) {
			state.userInfo = userInfo;
		},
		// 保存token
		saveToken(state: any, token: any) {
			state.token = token;
		},
		// 切换loading状态
		toggleSpinning(state: any, spinning: any) {
			state.spinning = spinning;
		},
		// 退出登录
		loginOutMutation(state: any) {
			state.token = '';
			state.userInfo = null;
			state.menuList = [];
			state.addRouters = [];
		},
	},
	actions: {
		// 获取能访问的路由
		GenerateRoutes({ commit }: any, data: any) {
			return new Promise(reslove => {
				const { permissions } = data;
				// 深拷贝一下，因为getPermissionRoute方法改变了asyncRouterMap作为参数的值
				const asyncRouters = cloneDeep(asyncRouterMap);
				const accessedRouters = getPermissionRoute(
					asyncRouters,
					permissions
				);
				if (!accessedRouters.length) {
					reslove(false);
				}
				commit('setRouters', accessedRouters);
				reslove(true);
			});
		},
		// 获取用户权限及信息
		GetInfo({ commit }: any) {
			return new Promise(async reslove => {
				// 从接口拿用户权限等信息
				const data = await $info();
				if (!data) {
					reslove(false);
				}
				commit('saveUserInfo', data);
				reslove(true);
			});
		},
	},
	modules: {
		user: UserVuex,
	},
	plugins: [dataState],
});
