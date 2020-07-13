<template>
  <div class="container">
    <appLoader v-if="!employee" />
    <div v-else>
      <app-detail :employee="employee" />
      <router-link to="/" class="brown lighten-1 waves-effect waves-light btn">Back</router-link>
      <button @click="$emit('deleteData', id)" class="waves-effect waves-light btn red">Delete</button>
      <app-button mode="edit" />
    </div>
  </div>
</template>
<script>
import Loader from "@/components/Loader";
import db from "@/firebase/index.js";
import Details from "@/components/Detail";
import FloatButton from "@/components/FloatButton";
export default {
  name: "appViewEmployee",
  components: {
    appLoader: Loader,
    appDetail: Details,
    appButton: FloatButton
  },
  data() {
    return {
      employee: null,
      id: null
    };
  },
  created() {
    const vm = this;
    db.collection("employees")
      .where("__id", "==", this.$route.params.id)
      .get()
      .then(function(querySnapshot) {
        vm.employee = querySnapshot.docs[0].data();
        vm.id = querySnapshot.docs[0].id;
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>
<style scoped>
.container {
  margin-top: 2em;
}
.btn {
  margin-right: 5px;
}
</style>