<template>
	<div class="container">
		请选择菜单权限
		<template v-for="(item, index) in routerMap">
			<div
				class="access-wrap"
				v-if="!item.meta.role.includes('root')"
				:key="index"
			>
				{{ item.meta.title }}
				<div class="children">
					<span
						v-for="(child, childIndex) in item.children"
						:key="childIndex"
					>
						<v-checkbox
							v-model="checkedList"
							:value="child.meta.role[0]"
							:label="child.meta.title"
						>
						</v-checkbox>
					</span>
				</div>
			</div>
		</template>
		<br />
		<v-btn color="primary" @click="login()">登录</v-btn>
	</div>
</template>
<script lang="ts">
import { asyncRouterMap } from '@/router/router.config';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { addRouters } from '@/router/index';
import $dialog from '@/plugins/dialog';
@Component({
	name: 'login',
})
export default class Login extends Vue {
	@Mutation('saveToken')
	private saveToken!: (token: string) => void;
	@Action('GetInfo')
	private GetInfo!: () => boolean;
	@Mutation('savePermissions')
	private savePermissions!: (data: any) => void;
	private routerMap: any = [];
	private checkedList: string[] = [];
	private mounted() {
		this.routerMap = asyncRouterMap[0].children;
	}
	// 获取当前权限的父级权限role
	private getParentRole(role: string) {
		const routerMap = this.routerMap;
		for (const item of routerMap) {
			const children = item.children;
			for (const child of children) {
				if (child.meta.role.includes(role)) {
					return item.meta.role[0];
				}
			}
		}
	}
	// 登录请求
	private async login() {
		$dialog({
			ok: () => {
				console.log('ok');
			},
			cancel: () => {
				console.log('cancel');
			},
		});
		return;
		// 获取用户勾选的权限
		const checkedList = this.checkedList;
		let permissions: any = [];
		// 获取勾选权限的父权限role
		for (const item of checkedList) {
			const role = this.getParentRole(item);
			permissions.push(item, role);
		}
		permissions = [...new Set(permissions)];
		// 权限应该在GetInfo里调用info接口获取权限，这里仅做示例
		this.savePermissions(permissions);
		const data = await this.GetInfo();
		if (!data) {
			// Modal.info({
			// 	title: '提示',
			// 	content: '用户信息获取失败，请重新登录',
			// 	okText: '确认',
			// });
			return;
		}
		// 获取用户权限信息后添加路由，避免直接走路由钩子会报 Uncaught (in promise) undefined
		const res = await addRouters();
		this.saveToken('token');
		res && this.$router.push('/');
	}
}
</script>
<style lang="less" scoped>
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.access-wrap {
		background: #f8f8f8;
		padding: 10px;
		width: 300px;
		.children {
			padding-left: 30px;
		}
	}
}
</style>
