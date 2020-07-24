<template>
  <nav class="my-3 navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link active-class="active" exact to="/" class="btn btn-sm btn-info mx-2">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link
            active-class="active"
            :to="{name: 'About', hash: `#${index}`}"
            class="btn btn-sm btn-info mx-2"
          >About</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" to="/user" class="btn btn-sm btn-info mx-2">User</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/redirect-me" class="btn btn-sm btn-danger">Redirect Me</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      index: 3,
    };
  },
  watch: {
    $route() {
      this.index = Math.floor(Math.random() * 3) + 1;
    },
  },
};
</script>

<style>
.btn {
  box-shadow: none !important;
}
</style>