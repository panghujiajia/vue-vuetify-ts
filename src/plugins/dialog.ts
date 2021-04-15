import Vue from 'vue';

import Dialog from '@/components/Dialog.vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

const Profile = Vue.extend(Dialog);
const AlertModal = (prop: any) => {
	let vm: any = new Profile().$mount();
	vm.$vuetify = new Vuetify().framework;
	const el = vm.$el;
	// document.body.appendChild(el);
	console.log(el);
	vm.dialog = true;
	vm.$on('ok', () => {
		prop.ok && prop.ok();
		document.body.removeChild(
			document.querySelector('.v-dialog__content')!
		);
		vm = null;
	});
	vm.$on('cancel', () => {
		prop.cancel && prop.cancel();
		// document.body.removeChild(el);
		vm = null;
	});
};
export default AlertModal;
