<template>
  <div class="container">
    <h1 class="text-success text-center">Filters and Mixins</h1>
    <div class="border p-3 my-3 container">
      <p class="lead">{{ text }}</p>
      <p class="lead">{{ text | toUpperCase }}</p>
      <p class="lead">{{ text | toUpperCase | toLowerCase }}</p>
    </div>
    <div class="border p-3 my-3 container">
      <div class="mb-3">
        <h4 class="text-center text-primary">App List</h4>
        <button @click="items.push('AngularJS')" class="mb-2 btn btn-sm btn-info">Add a Language</button>
        <div class="form-group">
          <input v-model="input" type="text" class="form-control" placeholder="Type Something here" />
        </div>
        <ul class="list-group">
          <li v-for="item in filteredList" :key="item" class="list-group-item">{{ item }}</li>
        </ul>
      </div>
      <app-list />
    </div>
  </div>
</template>

<script>
import Lists from "./components/Lists";
import { listMixin } from "@/listMixin";
export default {
  mixins: [listMixin],
  data() {
    return {
      text: "This is Some Text !"
    };
  },
  components: {
    appList: Lists
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
  },
  created() {
    console.log("created() from App");
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
}
</style>
