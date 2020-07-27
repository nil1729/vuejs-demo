<template>
  <div class="container">
    <h1 class="text-dark">Customers</h1>
    <app-filter-input />
    <table class="table table-hover mt-4 border">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="$store.state.loading">
          <td colspan="4">
            <h5 class="text-success text-center">Loading ...</h5>
          </td>
        </tr>
        <tr
          v-else-if="!$store.state.loading && ( customers.length === 0 || filtered && filtered.length === 0)"
        >
          <td colspan="4">
            <h5 class="text-success text-center">No Customers Found to Show</h5>
          </td>
        </tr>
        <tr v-else-if="filtered" v-for="customer in filtered" :key="customer._id">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>
            <router-link class="btn btn-sm btn-secondary" :to="`/view/${customer._id}`">View</router-link>
          </td>
        </tr>
        <tr v-else v-for="customer in customers" :key="customer._id">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>
            <router-link class="btn btn-sm btn-secondary" :to="`/view/${customer._id}`">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FilterInput from "../layouts/FilterInput";
export default {
  name: "AppHomePage",
  components: {
    appFilterInput: FilterInput,
  },
  created: async function () {
    const err = await this.$store.dispatch("customers");
    if (err) {
      return this.$store.dispatch("setAlert", {
        type: "Error",
        msg: err[0].message,
      });
    }
  },
  computed: {
    customers() {
      return this.$store.state.customers;
    },
    filtered() {
      return this.$store.state.filteredList;
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("CLEAR_FILTER");
    next();
  },
};
</script>

<style>
</style>