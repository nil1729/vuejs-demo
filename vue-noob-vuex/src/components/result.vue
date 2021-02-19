<template>
  <div class="container">
    <h4 class="text-primary">Counter Result: {{counter}}</h4>
    <h4 class="text-info">Vuex Counter Result: {{ $store.state.counter }}</h4>
    <h4 class="text-info">Vuex Counter Result ( 3 times ): {{ doubleCounter }}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppResult",
  props: {
    counter: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["doubleCounter"]),
  },
};
</script>

<style>
</style>