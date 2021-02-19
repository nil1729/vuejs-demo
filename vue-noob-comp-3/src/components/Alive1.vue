<template>
  <div class="container">
    <h3 class="text-center">This is Componenet one</h3>
  </div>
</template>

<script>
export default {
  destroyed() {
    alert("Component 1 is Destroyed");
  },
  activated() {
    console.log("Component 1 is Activated (Alive Part)");
  },
  deactivated() {
    alert("Component 1 is Deactivated");
  }
};
</script>

<style>
</style>