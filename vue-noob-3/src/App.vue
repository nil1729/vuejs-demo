<template>
  <div id="app">
    <app-navbar />
    <router-view
      @deleteData="handleDelete"
      @submittedForm="handleSubmit"
      :employees="employees"
      :loading="loading"
    />
  </div>
</template>
<script>
import M from "materialize-css/dist/js/materialize";
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
  beforeCreate() {
    M.AutoInit();
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSubmit(ev) {
      if (ev.type === "add") {
        return this.addData(ev.data);
      } else {
        return this.updateData(ev.data);
      }
    },
    addData(data) {
      const vm = this;
      db.collection("employees")
        .add(data)
        .then(function() {
          vm.fetchData();
          vm.$router.push(`/view/${data.__id}`);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateData(data) {
      const vm = this;
      db.collection("employees")
        .doc(data.id)
        .set(data)
        .then(function() {
          vm.fetchData();
          vm.$router.push(`/view/${data.__id}`);
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    fetchData() {
      this.loading = true;
      const vm = this;
      db.collection("employees")
        .orderBy("dept")
        .get()
        .then(function(querySnapshot) {
          vm.employees = [];
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
    },
    handleDelete(ev) {
      const vm = this;
      db.collection("employees")
        .doc(ev)
        .delete()
        .then(function() {
          vm.fetchData();
          vm.$router.push("/");
        })
        .catch(function(error) {
          console.log("Error removing document:", error);
        });
    }
  }
};
</script>
<style scoped>
#app {
  min-height: 100vh;
}
</style>
