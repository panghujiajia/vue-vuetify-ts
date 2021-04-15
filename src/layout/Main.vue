<template>
	<div>
		<my-sider></my-sider>
		<my-header></my-header>
		<v-main>
			<div class="container pa-md-4">
				<router-view></router-view>
			</div>
		</v-main>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyHeader from './Header.vue';
import MySider from './Sider.vue';
@Component({
	name: 'Main',
	components: {
		MySider,
		MyHeader,
	},
})
export default class Main extends Vue {}
</script>
<style lang="less" scoped>
/deep/.v-main {
	background: #eef2f5;
	min-height: calc(100vh - 64px);
}
</style>
