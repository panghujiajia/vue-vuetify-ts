const dayjs = require('dayjs');
// 包分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const time = dayjs().format('YYYYMMDDHHmm');
module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	assetsDir: time, // 静态资源目录 (js, css, img, fonts)
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.ts',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '管理系统',
		},
	},
	transpileDependencies: ['vuetify'],

	configureWebpack: config => {
		config.externals = {
			vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			aixos: 'aixos',
			dayjs: 'dayjs',
			G2Plot: '@antv/g2plot',
			wangeditor: 'window.wangEditor',
		};
		if (isProduction) {
			// 开启gzip压缩
			config.plugins.push(
				new CompressionPlugin({
					filename: '[path][base].gz',
					algorithm: 'gzip',
					test: /\.js$|\.html$|\.json$|\.css/,
					threshold: 10240,
					minRatio: 0.8,
				})
			);
		}
		// config.plugins.push(new BundleAnalyzerPlugin());
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://xxx.xxx.com', //
				changeOrigin: true,
			},
			'/api2': {
				target: 'http://xxx',
				changeOrigin: true,
			},
		},
	},

	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	productionSourceMap: false,
};
