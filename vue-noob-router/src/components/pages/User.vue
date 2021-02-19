<template>
  <div class="container">
    <h1 class="text-info">User Page</h1>
    <hr class="my-3" />
    <router-view />
    <hr class="my-3" />
  </div>
</template>

<script>
export default {
  name: "User",
  watch: {
    $route() {
      this.id = this.$route.params.id;
    },
  },
  computed: {
    user() {
      return this.names[this.$route.params.id];
    },
  },
};
</script>

<style>
</style>