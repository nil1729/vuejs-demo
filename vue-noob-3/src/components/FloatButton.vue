<template>
  <div class="fixed-action-btn">
    <router-link to="/add" class="btn-floating btn-large red waves-effect waves-light">
      <i class="large material-icons">{{ mode }}</i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FloatButton",
  props: ["mode"]
};
</script>

<style>
</style>