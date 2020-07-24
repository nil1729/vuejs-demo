<template>
  <div class="container center">
    <h1 class="light-green-text">About Page</h1>
    <button @click="goToHome" class="btn">Go to Home</button>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>