<template>
	<div class="card border-info mb-3">
		<div class="card-header">{{ track.artist_name }}</div>
		<div class="card-body">
			<h4 class="card-title">
				<i class="far fa-play-circle"></i>
				{{ track.track_name }}
			</h4>
			<p class="card-text lead">
				<i class="fas fa-compact-disc"></i>
				{{ track.album_name }}
			</p>
			<router-link to="/" class="btn btn-sm btn-info">
				<i class="fas fa-headphones"></i>
				View Lyrics
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	nama: 'ResultItem',
	props: ['track'],
};
</script>

<style></style>
