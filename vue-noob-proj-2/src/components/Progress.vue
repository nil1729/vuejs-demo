<template>
  <div class="container my-4">
    <h4 class="text-danger">Quotes Added</h4>
    <div class="progress position-relative">
      <p class="indicator">{{ progress }} / 10</p>
      <div class="progress-bar bg-success" role="progressbar" :style="{width: progress + '0%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["progress"]
};
</script>

<style scoped>
.indicator {
  top: 50%;
  background: transparent;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  z-index: 99;
  font-size: 1.2em;
}
.progress {
  height: 1.3rem;
  background: grey;
}
</style>