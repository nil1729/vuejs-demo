<template>
  <div class="container">
    <div class="row">
      <h4 class="center light-green-text">Edit Employee</h4>
      <appLoader v-if="!employee" />
      <app-form
        :employees="$attrs.employees"
        :employee="employee"
        v-else
        @submittedForm="passData"
      />
    </div>
  </div>
</template>

<script>
import Forms from "@/components/Forms";
import Loader from "@/components/Loader";
import db from "@/firebase/index.js";
export default {
  name: "appEditEmployee",
  components: {
    appLoader: Loader,
    appForm: Forms
  },
  data() {
    return {
      employee: null
    };
  },
  created() {
    const vm = this;
    db.collection("employees")
      .where("__id", "==", this.$route.params.id)
      .get()
      .then(function(querySnapshot) {
        vm.employee = {
          ...querySnapshot.docs[0].data(),
          id: querySnapshot.docs[0].id
        };
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    passData(ev) {
      this.$emit("submittedForm", { data: ev, type: "edit" });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 2em;
}
</style>