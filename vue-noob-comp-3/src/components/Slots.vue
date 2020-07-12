<template>
  <div class="container">
    <h4 class="text-success">Using Slots</h4>
    <slot name="quote"></slot>
    <hr />
    <slot></slot>
    <hr />
    <slot name="compare">Vue JS is very lean and fast compared to React JS</slot>
    <hr />
    <slot name="mevn">MongoDB is NoSQL Database</slot>
  </div>
</template>

<script>
export default {
  name: "Slots"
};
</script>

<style scoped>
.lead-vue {
  font-size: 1.25rem;
  font-weight: 300;
}
.small-vue {
  font-size: 80%;
  font-weight: 400;
  color: #aea79f !important;
}
</style>