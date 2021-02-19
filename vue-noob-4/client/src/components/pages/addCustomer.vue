<template>
  <div class="container">
    <h1 class="text-primary">Add Customer</h1>
    <hr class="my-2" />
    <form @submit.prevent="handleSubmit">
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
      const err = await this.$store.dispatch("addCustomer", this.customer);
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
        msg: `${this.customer.firstName} is Successfully added with Email <em>${this.customer.email}</em>`,
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
};
</script>

<style>
</style>