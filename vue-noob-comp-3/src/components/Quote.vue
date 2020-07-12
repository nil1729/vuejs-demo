<template>
  <div class="container">
    <h4 class="text-success">Using Props</h4>
    <p class="lead">
      {{ quote }}
      <br />
      <small class="text-secondary">-By {{ author }}</small>
    </p>
    <!-- <p class="text-right text-secondary">-By {{ author }}</p> -->
  </div>
</template>

<script>
export default {
  name: "Quote",
  props: ["quote", "author"]
};
</script>

<style scoped>
</style>