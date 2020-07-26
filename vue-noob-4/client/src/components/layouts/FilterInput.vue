<template>
  <div class="form-group my-3">
    <input
      v-model="text"
      type="text"
      class="form-control"
      placeholder="Enter Something here ... eg. John Doe"
    />
  </div>
</template>

<script>
export default {
  name: "AppFilterInput",
  data() {
    return {
      text: "",
    };
  },
  watch: {
    text() {
      if (this.text === "") {
        this.$store.commit("CLEAR_FILTER");
      } else {
        this.$store.commit("FILTER_LIST", this.text);
      }
    },
  },
};
</script>

<style>
</style>