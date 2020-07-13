<template>
  <div class="home">
    <app-loader v-if="this.$attrs.loading" />
    <app-employees v-else :employees="this.$attrs.employees" />
    <app-button mode="add" />
  </div>
</template>

<script>
import Employees from "@/components/Employees";
import Loader from "@/components/Loader";
import FloatButton from "@/components/FloatButton";
export default {
  name: "Home",
  components: {
    appEmployees: Employees,
    appLoader: Loader,
    appButton: FloatButton
  }
};
</script>
<style>
</style>