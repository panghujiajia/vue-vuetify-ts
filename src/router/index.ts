import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import { asyncRouterMap, constantRouterMap } from './router.config';
// import { Modal } from 'ant-design-vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import cloneDeep from 'lodash/cloneDeep';
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const router: any = new VueRouter({
	base: process.env.BASE_URL,
	routes: constantRouterMap,
});

// 路由白名单
const routeWhiteList = ['/404', '/403'];

const ShowModal = (tip: string, next: any) => {
	// Modal.info({
	// 	title: '提示',
	// 	content: tip,
	// 	okText: '确认',
	// 	cancelText: '取消',
	// 	onOk: async () => {
	// 		store.commit('saveToken', '');
	// 		next('/login');
	// 		NProgress.done();
	// 	},
	// });
};

// 判断有没有权限
const hasPermission = (roles: string[], route: any): boolean => {
	if (!roles) {
		return false;
	}
	if (route.meta && route.meta.role) {
		// 调试阶段通过给role添加root来直接访问
		if (route.meta.role.includes('root')) {
			return true;
		}
		return roles.some(role => {
			return route.meta.role.includes(role);
		});
	} else {
		return false;
	}
};

// 获取权限路由
export const getPermissionRoute = (routers: any, permissions: string[]) => {
	const newRouter = routers.map((item: any) => {
		if (hasPermission(permissions, item)) {
			if (item.children && item.children.length) {
				item.children = getPermissionRoute(item.children, permissions);
			}
			// 如果给了模块权限，没给路由权限，则不返回
			if (item.children && !item.children.length) {
				return false;
			}
			return item;
		}
		return false;
	});
	// 过滤下false的item
	return newRouter.filter((item: any) => {
		return item;
	});
};

// 重置路由
export const resetRouter = () => {
	const newRouter: any = new VueRouter({ routes: constantRouterMap });
	router.matcher = newRouter.matcher; // reset router
};
const GetChildren = (pPath: any, children: any[]) => {
	const pathList: string[] = [];
	children.forEach(item => {
		pathList.push(`/${pPath}/${item.path}`);
	});
	return pathList;
};

// 添加路由
export const addRouters = async () => {
	resetRouter();
	const res = await store.dispatch('GenerateRoutes', store.state.userInfo);
	return new Promise(reslove => {
		if (!res) {
			reslove(false);
		}
		router.addRoutes([...store.state.addRouters]);
		reslove(true);
	});
};

// 判定能否进页面
const getCanActivePage = (url: string) => {
	const userList = getPages(cloneDeep(store.state.menuList));
	const allList = getPages(cloneDeep(asyncRouterMap[0].children));
	// 有这个页面，但没这个权限
	if (allList.includes(url) && !userList.includes(url)) {
		return '403';
	}
	// 没这个页面
	if (!allList.includes(url)) {
		return '404';
	}
	return '200';
};

// 获取路由路径数组
const getPages = (list: any) => {
	const len = list.length;
	let pathList: any[] = [];
	let i = 0;
	for (; i < len; i++) {
		const item = list[i];
		if (item.children && item.children.length) {
			pathList = [...pathList, ...GetChildren(item.path, item.children)];
		} else {
			pathList = [...pathList, `/${item.path}`];
		}
	}
	pathList.push(...routeWhiteList);
	return pathList;
};

router.beforeEach(async (to: any, from: any, next: any) => {
	NProgress.start();
	to.meta && to.meta.title && (document.title = to.meta.title);
	const { token } = store.state;
	if (token) {
		if (!store.state.addRouters.length) {
			await store.dispatch('GetInfo');
			if (store.state.userInfo) {
				const res = await addRouters();
				if (!res) {
					const tip = '未得到访问权限，请联系管理员分配权限';
					ShowModal(tip, next);
					return;
				}
				next({ ...to, replace: true });
				NProgress.done();
			} else {
				const tip = '用户信息获取失败，请重新登录';
				ShowModal(tip, next);
			}
		} else {
			const pageStatus = getCanActivePage(to.fullPath);
			switch (pageStatus) {
				case '403':
					next('/403');
					break;
				case '404':
					next('/404');
					break;
				default:
					next();
					break;
			}
			NProgress.done();
		}
	} else {
		if (
			['/login'].includes(to.fullPath) ||
			(to.meta.role && to.meta.role.includes('root'))
		) {
			next();
		} else {
			document.title = '登录';
			next('/login');
		}
		NProgress.done();
	}
});
router.afterEach(() => {
	NProgress.done();
});

export default router;
