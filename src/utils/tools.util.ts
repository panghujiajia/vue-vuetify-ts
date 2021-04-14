// 手机号脱敏
export const mobileEncrypt = (val: string): string => {
	if (!val) return '';
	return val.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
};
// 身份证脱敏
export const idEncrypt = (val: string): string => {
	if (!val) return '';
	return val.replace(/(\w{6})\w*(\w{3})/, '$1*******$2');
};

// 生成6位字母数字随机字符
export const getRandomCode = () => {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 6; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};
