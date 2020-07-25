<template>
  <div>
    <router-view :isAuthenticated="isAuthenticated" :handleAuth="handleAuth" />
  </div>
</template>

<script>
import firebase from "./firebase/firebaseApp";
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  beforeCreate: async function () {
    const vm = this;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.isAuthenticated = true;
      } else {
        console.log("User is not authenticated");
      }
    });
  },
  methods: {
    handleAuth: async function (ev) {
      const vm = this;
      if (ev.mode === "login") {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(ev.email, ev.password);
          vm.isAuthenticated = true;
        } catch (e) {
          return e.message;
        }
      } else if (ev.mode === "register") {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(ev.email, ev.password);
          vm.isAuthenticated = true;
        } catch (e) {
          return e.message;
        }
      } else {
        try {
          await firebase.auth().signOut();
          vm.isAuthenticated = false;
        } catch (e) {
          return e;
        }
      }
    },
  },
};
</script>

<style>
</style>
