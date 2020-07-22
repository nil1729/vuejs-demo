<template>
  <div id="app">
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/layouts/Navbar";
export default {
  name: "App",
  components: {
    appNavbar: Navbar
  }
};
</script>

<style>
</style>
