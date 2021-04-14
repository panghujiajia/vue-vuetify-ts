import { $api, $http } from '..';

// 获取oss签名
export const $getSignature = async (params: any): Promise<any | boolean> => {
	try {
		const res = await $api.post('/signature', params);
		return res.data.data;
	} catch (error) {
		return false;
	}
};

// 上传请求
export const $upload = async (params: any): Promise<any | boolean> => {
	try {
		const res = await $http.post(
			'https://ibao-private.oss-cn-shanghai.aliyuncs.com',
			params,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					oss: true,
				},
			}
		);
		return true;
	} catch (error) {
		return false;
	}
};
// 生成唯一uuid
export const $uuid = (): string => {
	const S4 = () => {
		// tslint:disable-next-line: no-bitwise
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
};
