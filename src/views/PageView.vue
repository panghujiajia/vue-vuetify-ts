<template>
	<div>
		<!-- 如果有二级标题就显示面包屑 -->
		<v-breadcrumbs
			class="pa-0"
			v-if="$route.meta.breadcrumb"
			:items="$route.meta.breadcrumb"
		>
			<template v-slot:item="{ item }">
				<v-breadcrumbs-item
					:disabled="item.disabled"
					:class="{ curp: !item.disabled }"
					@click="$router.go(-1)"
				>
					{{ item.title }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>
		<router-view></router-view>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
	name: 'PageView',
})
export default class PageView extends Vue {}
</script>
<style lang="less" scoped>
.curp {
	cursor: pointer;
}
</style>
