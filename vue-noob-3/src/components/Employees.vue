<template>
  <div class="container">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <app-item v-for="employee in employees" :key="employee.__id" :employee="employee" />
    </ul>
  </div>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "Employees",
  props: ["employees"],
  components: {
    appItem: ListItem
  }
};
</script>

<style scoped>
.container {
  margin-top: 2em;
}
</style>