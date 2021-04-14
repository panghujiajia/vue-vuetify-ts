export default {
	namespaced: true,
	state: {
		userData: {},
	},
	getters: {},
	mutations: {
		saveUserData(state: any, data: any) {
			state.userData = data;
		},
	},
	actions: {},
};
