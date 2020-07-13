<template>
  <ul class="collection with-header">
    <li class="collection-header">
      <h4>{{ employee.name }}</h4>
    </li>
    <li class="collection-item">
      Employee ID:
      <strong>{{ employee.__id }}</strong>
    </li>
    <li class="collection-item">
      Department:
      <strong>{{ employee.dept }}</strong>
    </li>
    <li class="collection-item">
      Employee Position:
      <strong>{{ employee.post }}</strong>
    </li>
  </ul>
</template>

<script>
export default {
  name: "EmployeeDetail",
  props: ["employee"]
};
</script>

<style>
</style>