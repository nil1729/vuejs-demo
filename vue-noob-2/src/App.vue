<template>
  <div id="app">
    <nav class="py-1 navbar navbar-expand-lg navbar-dark bg-primary">
      <span class="navbar-brand mx-auto">Lyric Search App</span>
    </nav>
    <router-view @getTrack="getTrack" :results="tracks" :initial="initial" />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data: function() {
    return {
      tracks: [],
      initial: true
    };
  },
  methods: {
    getTrack(e) {
      const vm = this;
      vm.tracks = [];
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&q_track=${e}&f_has_lyrics=1&apikey=83b9c178f2228a8c4ea844a1e662c119`
        )
        .then(res => {
          vm.initial = false;
          vm.tracks = res.data.message.body.track_list;
        })
        .catch(err => console.log(err));
    }
  },
  beforeCreate() {
    const vm = this;
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&f_has_lyrics=2&quorum_factor=1&apikey=83b9c178f2228a8c4ea844a1e662c119"
      )
      .then(res => (vm.tracks = res.data.message.body.track_list))
      .catch(err => console.log(err));
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}
nav .navbar-brand {
  font-size: 1.5em;
  letter-spacing: 1px;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
