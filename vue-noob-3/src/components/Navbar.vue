<template>
  <nav class="green lighten-1">
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <div v-if="isAuthenticated">
            <li>
              <router-link class="black-text" to="/">Dashboard</router-link>
            </li>
            <li class="email black-text">{{ isAuthenticated.email }}</li>
            <li>
              <button @click="signOut" class="btn-flat indigo white-text">logout</button>
            </li>
          </div>
          <li v-if="!isAuthenticated">
            <router-link class="black-text" to="/auth">Authenticate</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { firebaseApp } from "@/firebase";
import M from "materialize-css/dist/js/materialize";
export default {
  name: "app-navbar",
  data() {
    return {
      isAuthenticated: null,
    };
  },
  beforeMount() {
    const vm = this;
    firebaseApp.auth().onAuthStateChanged((user) => {
      vm.isAuthenticated = user;
    });
  },
  methods: {
    signOut: async function () {
      if (firebaseApp.auth().currentUser) {
        try {
          await firebaseApp.auth().signOut();
          M.toast({ html: "You are Signed out !" });
          this.$router.push("/auth");
        } catch (e) {
          return M.toast({ html: e.message });
        }
      }
    },
  },
};
</script>

<style scoped>
.email.black-text {
  letter-spacing: 0.5px;
  margin-right: 15px;
}
.black-text {
  font-size: 1.1em;
}
</style>