import Vue from 'vue';

Vue.directive('aclRole', (el, binding) => {
	console.log(el);
	console.log(binding);
	const aclName = el.getAttribute('aclName');
	console.log(aclName);
});
