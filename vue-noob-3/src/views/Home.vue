<template>
  <div class="home">
    <app-loader v-if="this.$attrs.loading" />
    <app-employees v-else :employees="this.$attrs.employees" />
  </div>
</template>

<script>
import Employees from "@/components/Employees";
import Loader from "@/components/Loader";
export default {
  name: "Home",
  components: {
    appEmployees: Employees,
    appLoader: Loader
  }
};
</script>
<style>
</style>