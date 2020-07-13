<template>
  <div>
    <label>Switch Mode</label>
    <br />
    <button
      @click="switched(true)"
      id="on"
      type="button"
      class="btn-sm btn mr-1"
      :class="{'active': switchMode}"
    >ON</button>
    <button
      @click="switched(false)"
      id="off"
      type="button"
      class="btn btn-sm"
      :class="{'active': !switchMode}"
    >OFF</button>
  </div>
</template>

<script>
export default {
  name: "switchInput",
  props: ["switchMode"],
  methods: {
    switched(ev) {
      this.$emit("switched", ev);
    }
  }
};
</script>

<style scoped>
button {
  border: 1px solid rgb(68, 68, 230);
  transition: ease 0.3s;
  outline: none !important;
  box-shadow: none !important;
}
#on.active {
  background-color: rgba(79, 238, 79, 0.6);
}
#on:hover {
  background-color: rgba(79, 238, 79, 0.383);
}
#off.active {
  background-color: rgba(240, 84, 84, 0.6);
}
#off:hover {
  background-color: rgba(240, 84, 84, 0.376);
}
</style>