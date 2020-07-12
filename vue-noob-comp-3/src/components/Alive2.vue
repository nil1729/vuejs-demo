<template>
  <div class="container">
    <h3 class="text-center">This is Componenet two</h3>
  </div>
</template>

<script>
export default {
  destroyed() {
    alert("Component 2 is Destroyed");
  },
  activated() {
    console.log("Component 2 is Activated (Alive Part)");
  },
  deactivated() {
    alert("Component 2 is Deactivated");
  }
};
</script>

<style>
</style>