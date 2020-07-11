<template>
	<div>
		<search-lyric @searchQuery="getTrack"></search-lyric>
		<results :initial="initial" :tracks="tracks"></results>
	</div>
</template>

<script>
import SearchLyric from '../components/SearchLyric';
import Results from '../components/Results';
import axios from 'axios';
export default {
	name: 'Home',
	components: {
		searchLyric: SearchLyric,
		results: Results,
	},
	data: function() {
		return {
			tracks: [],
			initial: true,
		};
	},
	methods: {
		getTrack(e) {
			const vm = this;
			axios
				.get(
					`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&q_track=${e}&f_has_lyrics=1&apikey=83b9c178f2228a8c4ea844a1e662c119`
				)
				.then(res => {
					vm.initial = false;
					vm.tracks = res.data.message.body.track_list;
				})
				.catch(err => console.log(err));
		},
	},
	beforeCreate() {
		const vm = this;
		axios
			.get(
				'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&f_has_lyrics=2&quorum_factor=1&apikey=83b9c178f2228a8c4ea844a1e662c119'
			)
			.then(res => (vm.tracks = res.data.message.body.track_list))
			.catch(err => console.log(err));
	},
};
</script>
