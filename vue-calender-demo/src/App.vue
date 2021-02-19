<template>
	<v-app>
		<v-main>
			<v-sheet
				v-if="isLoading"
				:color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
				class="pa-8"
			>
				<v-skeleton-loader
					class="mx-auto"
					max-width="80%"
					type="table"
				></v-skeleton-loader>
			</v-sheet>
			<Calendar v-on:stopLoading="stopLoading" />
		</v-main>
	</v-app>
</template>

<script>
import Calendar from './components/Calender';
export default {
	name: 'App',
	data: () => ({
		isLoading: true,
	}),
	components: {
		Calendar: Calendar,
	},
	methods: {
		stopLoading() {
			this.isLoading = false;
		},
	},
	inject: {
		theme: {
			default: { isDark: false },
		},
	},
};
</script>

<style>
::-webkit-scrollbar {
	width: 0;
}
</style>
