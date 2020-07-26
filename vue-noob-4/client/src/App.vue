<template>
  <div>
    <app-navbar />
    <app-alerts />
    <div class="my-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Alerts from "./components/layouts/Alerts";
export default {
  name: "App",
  components: {
    appNavbar: Navbar,
    appAlerts: Alerts,
  },
};
</script>

<style>
button,
input,
.btn {
  box-shadow: none !important;
  outline: none !important;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
