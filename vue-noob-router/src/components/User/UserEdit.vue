<template>
  <div class="container">
    <h3 class="text-success">User Edit Page</h3>
    <p class="lead">
      <span class="font-weight-bold">UserID</span>
      {{': '}}{{$route.params.id}}
    </p>
    <div class="form-group">
      <fieldset>
        <label class="control-label">First Name</label>
        <input class="form-control" readonly :value="$route.query.fname" />
      </fieldset>
    </div>
    <div class="form-group">
      <fieldset>
        <label class="control-label">Last Name</label>
        <input class="form-control" readonly :value="$route.query.lname" />
      </fieldset>
    </div>
    <router-link
      :to="{name: 'userDetail', params: {id: $route.params.id}}"
      class="btn btn-sm btn-secondary"
    >Go to Detail Page</router-link>
  </div>
</template>

<script>
export default {
  name: "UserEditPage",
};
</script>

<style>
input {
  box-shadow: none !important;
}
</style>