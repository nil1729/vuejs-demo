<template>
  <div class="container">
    <h1 class="text-center text-primary">Routing</h1>
    <hr class="my-3" />
    <router-view name="navbar-top" />
    <router-view />
    <router-view name="navbar-bottom" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
}
</style>
