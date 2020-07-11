<template>
	<div class="container">
		<h3 class="text-center mt-2 mb-4">Top 10 Tracks</h3>
		<div class="row">
			<div
				:key="item.track.track_id"
				v-for="item in tracks"
				class="col-md-6 col-sm-12"
			>
				<div class="card border-info mb-3">
					<div class="card-header">{{ item.track.artist_name }}</div>
					<div class="card-body">
						<h4 class="card-title">
							<i class="far fa-play-circle"></i>
							{{ item.track.track_name }}
						</h4>
						<p class="card-text lead">
							<i class="fas fa-compact-disc"></i>
							{{ item.track.album_name }}
						</p>
						<a href="#" class="btn btn-sm btn-info">
							<i class="fas fa-headphones"></i>
							View Lyrics
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['tracks'],
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
