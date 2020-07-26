<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <span class="navbar-brand">vCustomers</span>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <router-link tag="li" active-class="active" class="nav-item" to="/" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link tag="li" active-class="active" class="nav-item" to="/about">
          <a class="nav-link">About</a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <router-link tag="li" active-class="active" class="nav-item" to="/add" exact>
          <a class="nav-link">Add Customer</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>