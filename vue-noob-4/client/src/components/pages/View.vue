<template>
  <div class="container">
    <router-link to="/">Back</router-link>
    <h3 v-if="$store.state.customerLoading" class="text-center text-success my-3">Loading ...</h3>
    <div v-else>
      <div class="mt-3 d-flex align-items-center">
        <h1 class="text-dark">{{ customer.firstName }} {{ customer.lastName }}</h1>
        <div class="ml-auto">
          <router-link :to="`/edit/${$route.params.id}`" class="btn btn-sm btn-info">Edit</router-link>
          <button
            @click="handleDelete"
            class="btn btn-sm btn-danger ml-2"
          >{{ dltBtnClicked ? 'Loading ...' : 'Delete' }}</button>
        </div>
      </div>
      <hr class="my-2" />
      <ul class="list-group">
        <li class="list-group-item">
          <p class="lead">
            <i class="mr-4 fas fa-phone-alt"></i>
            {{ customer.phone }}
          </p>
        </li>
        <li class="list-group-item">
          <p class="lead">
            <i class="mr-4 fas fa-envelope"></i>
            {{ customer.email }}
          </p>
        </li>
      </ul>
      <ul class="list-group my-3">
        <li class="list-group-item">
          <p class="lead">
            <i class="mr-4 fas fa-map-marked-alt"></i>
            {{ customer.address }}
          </p>
        </li>
        <li class="list-group-item">
          <p class="lead">
            <i class="mr-4 fas fa-city"></i>
            {{ customer.city }}
          </p>
        </li>
        <li class="list-group-item">
          <p class="lead">
            <i class="mr-4 fas fa-globe-asia"></i>
            {{ customer.state }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCustomerViewPage",
  data() {
    return {
      dltBtnClicked: false,
    };
  },
  created: async function () {
    const err = await this.$store.dispatch("customer", this.$route.params.id);
    if (err) {
      return this.$store.dispatch("setAlert", {
        type: "Error",
        msg: err[0].message,
      });
    }
  },
  computed: {
    customer() {
      return this.$store.state.currentCustomer;
    },
  },
  methods: {
    handleDelete: async function () {
      this.dltBtnClicked = true;
      const err = await this.$store.dispatch(
        "deleteCustomer",
        this.$route.params.id
      );
      if (err) {
        return this.$store.dispatch("setAlert", {
          type: "Error",
          msg: err[0].message,
        });
      }
      this.$store.dispatch("setAlert", {
        type: "Notification",
        msg: `${this.customer.firstName} is Successfully Deleted`,
      });
      this.$router.push("/");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "EditCustomer") {
      next();
    } else {
      this.$store.commit("CLEAR_CURRENT_CUSTOMER");
      next();
    }
  },
};
</script>

<style scoped>
.lead {
  margin-bottom: 0;
}
</style>