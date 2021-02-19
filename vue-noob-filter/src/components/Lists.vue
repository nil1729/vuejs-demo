<template>
  <div class="mb-2">
    <h4 class="text-center text-primary">Component List</h4>
    <div class="form-group">
      <input v-model="input" type="text" class="form-control" placeholder="Type Something here" />
    </div>
    <ul class="list-group">
      <li v-for="item in filteredList" :key="item" class="list-group-item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { listMixin } from "@/listMixin";
export default {
  mixins: [listMixin],
  created() {
    console.log("created() from List Component");
  }
};
</script>
