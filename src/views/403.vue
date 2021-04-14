<template>
	<div class="text-center">
		<br>
		<br>
		<br>
		<br>
		<br>
		<h3>403，对不起，暂无访问权限</h3>
		<br>
		<v-btn color="primary" @click="$router.go(-2)">返回上一页</v-btn>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
	name: 'NoAccess',
})
export default class NoAccess extends Vue {}
</script>
<style lang="less" scoped></style>
