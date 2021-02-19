<template>
  <div class="container border py-3">
    <h3 class="text-center">I am Second Component</h3>
    <p class="lead text-center">I am using {{ db }} as Database</p>

    <button @click="changeDB" class="btn btn-sm btn-info">Change Database</button>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  props: ["db"],
  methods: {
    changeDB() {
      //   this.$emit("changeDB", "MongoDB");
      this.db = "MongoDB";
      EventBus.$emit("changeDB", this.db);
    }
  }
};
</script>

<style scoped>
.container {
  box-shadow: 0 0 10px grey;
}
</style>