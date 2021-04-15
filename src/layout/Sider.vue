<template>
	<div>
		<v-navigation-drawer app permanent :mini-variant.sync="mini">
			<v-list-item class="pa-2">
				<v-list-item-avatar tile>
					<v-img src="https://randomuser.me/api/portraits/men/78.jpg">
					</v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>管理系统</v-list-item-title>
				</v-list-item-content>
				<v-btn icon @click.stop="mini = !mini">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item>
			<v-list nav dense>
				<v-list-item-group>
					<template v-for="(item, i) in menuList">
						<template v-if="!item.meta.invisible">
							<v-list-group
								:key="i"
								:prepend-icon="item.meta.icon"
								no-action
								active-class="v-list-item--active"
							>
								<template v-slot:activator>
									<v-list-item-title>
										{{ item.meta.title }}
									</v-list-item-title>
								</template>
								<template v-for="(child, k) in item.children">
									<v-list-item
										v-if="!child.meta.invisible"
										color="primary"
										:key="i + k"
										:to="`/${item.path}/${child.path}`"
									>
										<v-list-item-content>
											<v-list-item-title>
												{{ child.meta.title }}
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</template>
							</v-list-group>
						</template>
						<template v-else>
							<template v-for="(child, k) in item.children">
								<v-list-item
									v-if="!child.meta.invisible"
									color="primary"
									:key="i + k"
									:to="`/${item.path}/${child.path}`"
								>
									<v-list-item-icon>
										<v-icon>{{ child.meta.icon }}</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title>
											{{ child.meta.title }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</template>
						</template>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
	name: 'MySider',
})
export default class MySider extends Vue {
	@State('menuList')
	private menuList!: any;
	private mini = false;
}
</script>
<style lang="less" scoped></style>
