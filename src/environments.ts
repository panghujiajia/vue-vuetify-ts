const env: string = process.env.NODE_ENV;

console.log(env);

const configs: any = {
	// 生产环境
	production: {
		// url: 'http://admin.xab.vip/api',
		url: 'http://admin.dev2.xab.vip/api',
		pdf: 'http://admin.dev2.xab.vip/pdf',
	},
	// 开发环境
	development: {
		url: '/api',
		pdf: '/pdf'
		// url: 'http://192.168.0.43:9095/api',
		// url: 'http://39.101.65.95:9095/api',
	},
};

export default configs[env];
