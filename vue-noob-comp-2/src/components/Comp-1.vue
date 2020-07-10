<template>
  <div id="cmp-1" class="container border py-3">
    <h3 class="text-center">I am First Component</h3>
    <p class="lead text-center">I love {{ capitalize() }}</p>
    <p class="lead text-center">I am using {{ db }} as Database</p>

    <button @click="resetName" class="btn btn-sm btn-primary">Change Framework by $emit</button>
    <button @click="resetFn()" class="btn btn-sm btn-info">Change Framework by callback Function</button>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  //   props: ["framework"],
  props: {
    framework: {
      type: String,
      default: "Angular JS"
      //   required: true
    },
    resetFn: Function,
    db: String
  },
  methods: {
    capitalize() {
      return this.framework.toUpperCase();
    },
    resetName() {
      this.$emit("nameWasChanged", "Angular");
    }
  },
  created() {
    const vm = this;
    EventBus.$on("changeDB", db => {
      vm.db = db;
    });
  }
};
</script>

<style scoped>
#cmp-1 {
  box-shadow: 0 0 10px grey;
}
</style>