<template>
  <div>
    <search-lyric @searchQuery="getTrack"></search-lyric>
    <loader v-if="this.$attrs.results.length === 0" />
    <results v-else :initial="this.$attrs.initial" :tracks="this.$attrs.results"></results>
  </div>
</template>

<script>
import SearchLyric from "../components/SearchLyric";
import Results from "../components/Results";
export default {
  name: "Home",
  components: {
    searchLyric: SearchLyric,
    results: Results
  },
  methods: {
    getTrack(e) {
      this.$emit("getTrack", e);
    }
  }
};
</script>
