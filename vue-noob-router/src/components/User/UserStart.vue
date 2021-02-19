<template>
  <div class="container">
    <h3 class="text-success">List of Users</h3>
    <ul class="list-group">
      <router-link
        v-for="i in 4"
        :key="i"
        tag="li"
        :to="{ name: 'userDetail', params: {id: i} }"
        class="list-group-item"
        style="cursor: pointer"
      >
        <a>User {{ i }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserStart",
};
</script>

<style>
</style>