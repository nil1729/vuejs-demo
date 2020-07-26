<template>
  <div>
    <app-navbar />
    <div class="my-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
export default {
  name: "App",
  components: {
    appNavbar: Navbar,
  },
};
</script>

<style>
button {
  box-shadow: none !important;
}
</style>
