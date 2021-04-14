<template>
	<div class="text-center">
		<br>
		<br>
		<br>
		<br>
		<br>
		<h3>404，对不起，您访问的页面不存在</h3>
		<br>
		<v-btn color="primary" @click="$router.go(-2)">返回上一页</v-btn>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
	name: 'NotFound',
})
export default class NotFound extends Vue {}
</script>
<style lang="less" scoped></style>
