<template>
	<div>
		<v-app-bar app fixed scroll-target color="#fff">
			<div class="d-flex flex-grow-1 align-center"></div>
			<v-spacer></v-spacer>
			<div>
				<v-menu class="pa-1" transition="slide-y-transition" offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							icon
							light
							elevation="2"
							v-bind="attrs"
							v-on="on"
						>
							<v-badge
								dot
								bordered
								color="success"
								:offset-x="10"
								:offset-y="10"
							>
								<v-avatar size="40">
									<v-img
										src="https://lux-admin-pro.indielayer.com/images/avatars/avatar1.svg"
									>
									</v-img>
								</v-avatar>
							</v-badge>
						</v-btn>
					</template>
					<v-list class="pa-0">
						<v-list-item class="pa-0">
							<v-btn text @click="loginOut()">
								<v-icon>mdi-location-exit</v-icon>
								<span>退出登录</span>
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</v-app-bar>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
@Component({
	name: 'MyHeader',
})
export default class MyHeader extends Vue {
	@Mutation('loginOutMutation')
	private loginOutMutation!: () => void;
	// 退出登录
	private loginOut() {
		this.loginOutMutation();
		this.$router.push('/login');
	}
}
</script>
<style lang="less" scoped></style>
