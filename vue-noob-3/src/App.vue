<template>
  <div id="app">
    <app-navbar />
    <router-view :employees="employees" :loading="loading" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import db from "@/firebase/index.js";
export default {
  name: "App",
  components: {
    appNavbar: Navbar
  },
  data() {
    return {
      employees: [],
      loading: false
    };
  },
  created() {
    const docRef = db.collection("employees");
    this.loading = true;
    const vm = this;
    docRef
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          vm.employees.push(doc.data());
        });
      })
      .then(() => {
        vm.loading = false;
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>
<style>
</style>
