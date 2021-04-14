<template>
	<div>
		<v-app>
			<router-view></router-view>
		</v-app>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component({
	name: 'App',
	components: {},
})
export default class App extends Vue {}
</script>
