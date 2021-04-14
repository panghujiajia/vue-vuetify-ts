import axios, { AxiosInstance } from 'axios';
import store from '@/store/index';

import httpConfig from '../environments';
// import { message, Modal } from 'ant-design-vue';
import router from '@/router/index';

axios.defaults.timeout = 30000; // 设置超时时间
axios.defaults.showLoading = true; // 设置请求是否loading
const ShowLoading = () => {
	store.commit('toggleSpinning', true);
};
const HideLoading = () => {
	store.commit('toggleSpinning', false);
};
const loginOut = () => {
	// Modal.info({
	// 	title: '提示',
	// 	content: '登录失效，请重新登录',
	// 	okText: '确认',
	// 	onOk: () => {
	// 		store.commit('loginOutMutation');
	// 		store.commit('clearSelectData');
	// 		router.replace('/login');
	// 	},
	// });
};
const createInterceptor = (instance: AxiosInstance): void => {
	instance.interceptors.request.use(
		config => {
			// Do something before request is sent
			ShowLoading();
			// 判断接口是否需要token
			if (config.headers.auth) {
				const token = store.state.token;
				// 如果没有token 拒绝请求
				if (!token) {
					loginOut();
					return Promise.reject(config);
				}
				config.headers.Authorization = token;
			}
			return config;
		},
		error => {
			// Do something with request error
			HideLoading();
			console.log(error);
			message.error('请求错误，请稍后再试');
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		response => {
			// Do something with response data
			HideLoading();
			// token过期
			if (response.data.status === 402) {
				loginOut();
				return Promise.reject(response);
			}
			// 是否忽略状态码200判断
			// 忽略后可在接口中单独做判断
			if (response.config.headers.ignoreStatus) {
				if (response.status !== 200) {
					message.info(
						response.data.message || '响应错误，请稍后再试'
					);
					return Promise.reject(response);
				}
			}
			return response;
		},
		error => {
			// Do something with response error
			HideLoading();
			console.log(error);
			message.error('网络错误，请稍后再试');
			return Promise.reject(error);
		}
	);
};

// 初始化实例
const httpInstance = axios.create({
	baseURL: httpConfig.pdf,
	headers: {
		auth: true, // 是否需要token验证
		ignoreStatus: false, // 是否忽略状态码200判断
	},
});
const apiInstance = axios.create({
	baseURL: httpConfig.url,
	headers: {
		auth: true, // 是否需要token验证
		ignoreStatus: false, // 是否忽略状态码200判断
	},
});
createInterceptor(apiInstance);
createInterceptor(httpInstance);

export const $http = httpInstance;
export const $api = apiInstance;
