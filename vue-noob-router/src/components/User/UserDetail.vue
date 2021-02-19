<template>
  <div class="container">
    <h3 class="text-success">User Detail Page</h3>
    <p class="lead">
      <span class="font-weight-bold">UserID</span>
      {{': '}}{{$route.params.id}}
    </p>
    <p class="lead">
      <span class="font-weight-bold">Name</span>
      {{': '}}{{ details[$route.params.id] }}
    </p>
    <button @click="goToEditPage" class="btn btn-sm btn-danger">Edit User</button>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  data() {
    return {
      details: ["", "Nilanjan Deb", "John Doe", "Lorem Ipsum", "Brad Jones"],
    };
  },
  methods: {
    goToEditPage() {
      this.$router.push({
        name: "userEdit",
        params: {
          id: this.$route.params.id,
        },
        query: {
          fname: this.details[this.$route.params.id].split(" ")[0],
          lname: this.details[this.$route.params.id].split(" ")[1],
        },
      });
    },
  },
};
</script>

<style>
</style>