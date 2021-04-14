import { $api } from '../index';
import qs from 'qs';
import { LoginData } from '@/types/modules/Login.type';
import store from '@/store/index';
// 登录
export const $login = async (params: any): Promise<LoginData | boolean> => {
	params = qs.stringify(params);
	try {
		const res = await $api.post('/login', params, {
			headers: {
				auth: false, // 无需token
			},
		});
		return res.data.data;
	} catch (error) {
		return false;
	}
};

// 获取用户权限
export const $info = async (): Promise<any> => {
	try {
		// 应该后台返回，这里仅做示例
		const permissions = store.state.permissions;
		return {
			name: '张三',
			permissions,
		};
	} catch (error) {
		return false;
	}
};
