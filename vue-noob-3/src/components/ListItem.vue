<template>
  <li class="collection-item">
    <div>
      <div class="chip">{{ employee.dept }}</div>
      {{ employee.name }}
      <router-link :to="/view/ + employee.__id" class="secondary-content">
        <i class="material-icons">remove_red_eye</i>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: "appItem",
  props: ["employee"]
};
</script>

<style>
</style>