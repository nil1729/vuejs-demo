<template>
  <div class="container">
    <h1
      class="text-primary"
    >Edit {{ $store.state.customerLoading ? 'Customer' : $store.state.currentCustomer.firstName }}</h1>
    <hr class="my-2" />
    <h3 v-if="$store.state.customerLoading" class="text-center text-success my-3">Loading ...</h3>
    <form v-else @submit.prevent="handleSubmit">
      <div class="jumbotron my-3 p-4">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label>First Name</label>
          <input
            required
            v-model="customer.firstName"
            type="text"
            class="form-control"
            placeholder="Enter Fisrt Name"
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            required
            v-model="customer.lastName"
            type="text"
            class="form-control"
            placeholder="Enter Last Name"
          />
        </div>
      </div>
      <div class="jumbotron my-3 p-4">
        <h4>Customer Contact</h4>
        <div class="form-group">
          <label>Email Address</label>
          <input
            required
            v-model="customer.email"
            type="email"
            class="form-control"
            placeholder="Enter Email Address"
          />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input
            required
            v-model="customer.phone"
            type="tel"
            class="form-control"
            placeholder="Enter Phone Number"
          />
        </div>
      </div>
      <div class="jumbotron my-3 p-4">
        <h4>Customer location</h4>
        <div class="form-group">
          <label>Address</label>
          <input
            required
            v-model="customer.address"
            type="text"
            class="form-control"
            placeholder="Enter Full Address"
          />
        </div>
        <div class="form-group">
          <label>City</label>
          <input
            required
            v-model="customer.city"
            type="text"
            class="form-control"
            placeholder="Enter City"
          />
        </div>
        <div class="form-group">
          <label>State</label>
          <input
            v-model="customer.state"
            type="text"
            class="form-control"
            placeholder="Enter State"
          />
        </div>
        <div class="text-center">
          <button class="btn btn-success">{{ submitted ? 'Loading ...' : 'Submit' }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AppAddPage",
  data() {
    return {
      customer: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        state: "",
      },
      submitted: false,
    };
  },
  created: async function () {
    if (!this.$store.state.currentCustomer) {
      const err = await this.$store.dispatch("customer", this.$route.params.id);
      if (err) {
        return this.$store.dispatch("setAlert", {
          type: "Error",
          msg: err[0].message,
        });
      }
    }
    this.customer = this.$store.state.currentCustomer;
  },
  methods: {
    handleSubmit: async function () {
      this.submitted = true;
      if (!this.validateEmail(this.customer.email)) {
        this.submitted = false;
        return this.$store.dispatch("setAlert", {
          type: "Error",
          msg: "Please enter a valid Email Address",
        });
      }
      const err = await this.$store.dispatch("updateCustomer", {
        customer: this.customer,
        _id: this.$route.params.id,
      });
      if (err) {
        this.submitted = false;
        return this.$store.dispatch("setAlert", {
          type: "Error",
          msg: err[0].message,
        });
      }
      this.submitted = false;
      this.$store.dispatch("setAlert", {
        type: "Notification",
        msg: `${this.customer.firstName} is Successfully Updated with Email <em>${this.customer.email}</em>`,
      });
      this.$router.push("/");
    },
    validateEmail(email) {
      const reg = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return reg.test(email);
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("CLEAR_CURRENT_CUSTOMER");
    next();
  },
};
</script>

<style>
</style>