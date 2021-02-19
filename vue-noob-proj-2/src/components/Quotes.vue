<template>
  <div class="container my-4">
    <div class="justify-content-center row">
      <div
        @click="$emit('deleteQuote', item.id)"
        :key="item.id"
        v-for="item in quotes"
        class="col-md-3"
      >
        <p class="lead">{{ item.quote }}</p>
      </div>
    </div>
    <br />
    <div class="alert alert-info text-center">info: Click on a Quote to Delete it</div>
  </div>
</template>

<script>
export default {
  props: ["quotes"]
};
</script>

<style>
.alert-info {
  background-color: rgba(108, 149, 226, 0.493) !important;
  color: black;
}
.row .col-md-3 {
  border: 1px solid rgba(128, 128, 128, 0.507);
  padding: 10px;
  background: rgba(128, 128, 128, 0.068);
  margin: 10px 1em;
  cursor: pointer;
  transition: all 0.5s;
}
.row .col-md-3:hover {
  background: rgba(241, 148, 148, 0.109);
}
</style>