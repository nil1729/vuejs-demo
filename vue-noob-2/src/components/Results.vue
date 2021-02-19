<template>
	<div class="container">
		<h3 v-if="initial" class="text-center mb-4">Top 10 Tracks</h3>
		<h3 v-else class="text-center mb-4">Search Results</h3>
		<div class="row">
			<div
				:key="item.track.track_id"
				v-for="item in tracks"
				class="col-md-6 col-sm-12"
			>
				<ResultItem :track="item.track" />
			</div>
		</div>
	</div>
</template>

<script>
import ResultItem from './ResultItem';
export default {
	props: ['tracks', 'initial'],
	components: {
		ResultItem,
	},
};
</script>

<style>
.card {
	min-height: 15rem;
	position: relative;
}
.card a {
	position: absolute;
	bottom: 1em;
	color: white !important;
	text-decoration: none;
	font-size: 1.1em;
	letter-spacing: 1px;
}
</style>
