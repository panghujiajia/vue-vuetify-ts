<template>
	<div>
		<v-dialog v-model="dialog" width="500" attach="body" persistent>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Privacy Policy
				</v-card-title>
				<v-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="handleOk()">
						I accept
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Vuetify from 'vuetify';
Vue.use(Vuetify);
@Component({
	name: 'Alert',
})
export default class Alert extends Vue {
	private dialog = false;
	private type = 'info';

	private handleCancel() {
		this.handleClose();
		this.$emit('cancel');
	}
	private handleOk() {
		this.handleClose();
		this.$emit('ok');
	}
	private handleClose() {
		this.dialog = false;
	}
}
</script>
<style lang="less" scoped></style>
