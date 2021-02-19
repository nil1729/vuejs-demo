<template>
  <div class="container">
    <div class="jumbotron pt-3 pb-1">
      <router-link to="/" class="btn btn-sm btn-info">
        <i class="fas fa-arrow-left"></i>
        Go Back
      </router-link>
      <div v-if="track && lyrics">
        <div class="card border-info my-3">
          <div class="card-header">
            <span class="text-primary font-weight-bold">{{ track.track_name }}</span>
            By {{ track.artist_name }}
          </div>
          <div class="card-body">
            <p class="card-text lead">{{ lyrics }}</p>
          </div>
        </div>
        <br />
        <p class="lead border p-2">
          <span class="font-weight-bold">Album ID:</span>
          {{ track.artist_id }}
        </p>
        <p class="lead border p-2">
          <span class="font-weight-bold">Explicit Track:</span>
          {{ track.explicit === 0 ? 'No' : 'Yes' }}
        </p>
        <p class="lead border p-2">
          <span class="font-weight-bold">Realease Date:</span>
          {{ new Date(track.updated_time).toLocaleDateString() }}
        </p>
      </div>
      <loader v-else />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      lyrics: null,
      track: null
    };
  },
  created() {
    this.getDetail(this.$route.params.id);
    this.getLyrics(this.$route.params.id);
  },
  methods: {
    getDetail(id) {
      const vm = this;
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?format=json&track_id=${id}&apikey=83b9c178f2228a8c4ea844a1e662c119`
        )
        .then(res => {
          vm.track = res.data.message.body.track;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLyrics(id) {
      const vm = this;
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=json&track_id=${id}&apikey=83b9c178f2228a8c4ea844a1e662c119`
        )
        .then(res => {
          vm.lyrics = res.data.message.body.lyrics.lyrics_body;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style scoped>
.btn.btn-sm {
  font-size: 1.1em;
  letter-spacing: 1px;
}
.list-group-item {
  color: #222222;
}
.jumbotron {
  background: #fff;
}
</style>
