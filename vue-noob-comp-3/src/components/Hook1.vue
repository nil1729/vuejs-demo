<template>
  <div class="container">
    <h3 class="text-center">This is Componenet one</h3>
  </div>
</template>

<script>
export default {
  destroyed() {
    alert("Component 1 is Destroyed");
  }
};
</script>

<style>
</style>