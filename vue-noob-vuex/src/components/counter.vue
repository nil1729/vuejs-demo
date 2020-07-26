<template>
  <div class="container">
    <button @click="update(1)" class="btn btn-sm btn-info">Increase</button>
    <button @click="update(-1)" class="btn btn-sm btn-danger ml-2">Decrease</button>
    <button @click="vuexUpdate(10)" class="btn btn-sm btn-warning text-dark ml-2">Increase By Vuex</button>
    <button @click="vuexUpdate(-5)" class="btn btn-sm btn-success ml-2">Decrease By Vuex</button>
  </div>
</template>

<script>
export default {
  name: "AppCounter",
  methods: {
    update(ev) {
      this.$emit("updated", ev);
    },
    vuexUpdate(ev) {
      if (ev > 0) {
        this.$store.dispatch("increase", ev);
      } else {
        this.$store.dispatch("decrease", -ev);
      }
    },
  },
};
</script>

<style>
</style>