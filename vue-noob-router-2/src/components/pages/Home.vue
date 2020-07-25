<template>
  <div class="container p-4 bg-light">
    <h1 class="text-primary">Home Page</h1>
    <hr class="my-3" />
    <p class="lead">
      Email Address:
      <span class="text-dark">{{ email }}</span>
    </p>
    <button
      @click="$attrs.handleAuth({mode: 'signout'})"
      class="btn btn-sm btn-warning text-dark"
    >Sign out</button>
    <button @click="$router.push('/something')" class="btn btn-sm btn-danger mx-2">Go Somewhere</button>
  </div>
</template>

<script>
import firebase from "@/firebase/firebaseApp";
export default {
  name: "AppHomePage",
  data() {
    return {
      email: "",
    };
  },
  mounted() {
    this.email =
      firebase.auth().currentUser && firebase.auth().currentUser.email;
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$attrs.isAuthenticated) {
      next();
    } else {
      if (confirm("Are you sure you want to leave ?")) {
        next();
      }
    }
  },
  watch: {
    "$attrs.isAuthenticated"() {
      if (!this.$attrs.isAuthenticated) {
        this.$router.push({
          name: "Auth",
        });
      }
    },
  },
  beforeRouteEnter: function (to, from, next) {
    if (from.name === "Auth") {
      next();
    } else {
      next({
        name: "Auth",
      });
    }
  },
};
</script>

<style>
</style>