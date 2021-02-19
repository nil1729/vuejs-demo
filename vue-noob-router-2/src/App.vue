<template>
  <div>
    <div v-if="loading" class="loader p-4">
      <div></div>
    </div>
    <router-view
      :createAlert="createAlert"
      :clearAlerts="clearAlerts"
      :alerts="alerts"
      :isAuthenticated="isAuthenticated"
      :handleAuth="handleAuth"
    />
  </div>
</template>

<script>
import firebase from "./firebase/firebaseApp";
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
      loading: true,
      alerts: null,
    };
  },
  watch: {
    alerts() {
      const vm = this;
      if (vm.alerts !== "") {
        setTimeout(() => {
          vm.alerts = "";
        }, 4000);
      } else {
        clearTimeout();
      }
    },
  },
  beforeCreate: async function () {
    const vm = this;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.isAuthenticated = true;
      } else {
        console.log("User is not authenticated");
      }
      vm.loading = false;
    });
  },
  methods: {
    createAlert(ev) {
      this.alerts = { ...ev };
    },
    clearAlerts() {
      this.alerts = null;
    },
    handleAuth: async function (ev) {
      const vm = this;
      if (ev.mode === "login") {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(ev.email, ev.password);
          vm.isAuthenticated = true;
        } catch (e) {
          return e;
        }
      } else if (ev.mode === "register") {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(ev.email, ev.password);
          vm.isAuthenticated = true;
        } catch (e) {
          return e;
        }
      } else {
        try {
          await firebase.auth().signOut();
          vm.isAuthenticated = false;
          this.alerts = {
            code: "Notification",
            message: "Successfully Signed out",
          };
        } catch (e) {
          return e;
        }
      }
    },
  },
};
</script>

<style>
.loader {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 99;
  display: flex;
  align-items: center;
  background: rgb(31, 29, 29);
}
.loader div {
  height: 100px;
  width: 100px;
  border: 3px solid rgb(241, 211, 211);
  border-bottom: 0;
  border-top: 0;
  border-radius: 50%;
  margin: auto;
  animation: loader 1s infinite linear;
}
@keyframes loader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
