<template>
  <div class="container">
    <h3 class="text-center">This is Componenet two</h3>
  </div>
</template>

<script>
export default {
  destroyed() {
    alert("Component 2 is Destroyed");
  }
};
</script>

<style>
</style>