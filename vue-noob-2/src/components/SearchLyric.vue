<template>
  <div class="container mt-3">
    <div class="jumbotron text-center py-3 border border-light">
      <h1>
        <i class="fas fa-music"></i> Search for a Song
      </h1>
      <hr />
      <p class="lead">Get the lyrics for any track</p>
      <form @submit="handleSubmit">
        <div class="form-group">
          <input v-model="track" type="text" class="form-control" placeholder="Song Title ..." />
        </div>
        <button class="btn btn-sm btn-primary col">Get Track Lyrics</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      track: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit("searchQuery", this.track);
      this.track = "";
    }
  }
};
</script>

<style>
.jumbotron {
  border: 1px solid rgb(211, 207, 207) !important;
}
button.btn.btn-sm {
  font-size: 1.1em !important;
  letter-spacing: 1px !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>