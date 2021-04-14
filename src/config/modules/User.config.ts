const config = {
	// 表头内容
	table_account: [
		{
			title: '登录账号',
			dataIndex: 'username',
			align: 'center',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			align: 'center',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'action' },
			align: 'center',
		},
	],
	// 账号的校验规则
	rules_account: {
		username: [
			{
				required: true,
				message: '请输入登录账号',
				trigger: 'blur',
			},
			{
				message: '登录账号限制2～30个字符',
				min: 2,
				max: 30,
				trigger: 'blur',
			},
		],
		password: [
			{
				required: true,
				message: '请输入登录密码',
				trigger: 'blur',
			},
			{
				message: '登录密码限制2～30个字符',
				min: 2,
				max: 30,
				trigger: 'blur',
			},
			{
				message: '密码不能包含汉字或符号',
				pattern: /^[A-Za-z0-9]+$/,
				trigger: 'blur',
			},
		],
	},
	// 账号状态
	config_status: {
		1: '启用',
		2: '停用',
	},
};

export default config;
