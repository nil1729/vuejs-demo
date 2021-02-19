<template>
  <div class="container">
    <div class="row">
      <h4 class="center light-green-text">Add Employee</h4>
      <app-form :employees="$attrs.employees" @submittedForm="passData" />
    </div>
  </div>
</template>

<script>
import Forms from "@/components/Forms";
export default {
  name: "appAddEmployee",
  components: {
    appForm: Forms
  },
  methods: {
    passData(ev) {
      this.$emit("submittedForm", { data: ev, type: "add" });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 2em;
}
</style>