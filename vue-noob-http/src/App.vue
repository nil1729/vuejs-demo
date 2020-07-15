<template>
  <div class="container p-3">
    <h1 class="text-center text-success">Making HTTP Requests</h1>
    <hr class="my-3" />
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email address</label>
        <input v-model="email" type="email" class="form-control" placeholder="Enter your Email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter Password" />
      </div>
      <fieldset class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input v-model="type" value="customer" type="radio" class="form-check-input" /> Customer
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input v-model="type" value="seller" type="radio" class="form-check-input" /> Seller
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input v-model="type" value="data" type="radio" class="form-check-input" /> Visitor
          </label>
        </div>
      </fieldset>
      <button class="btn btn-success btn-sm">{{ !submitted ? 'Submit' : 'Loading...'}}</button>
    </form>
    <hr class="my-4" />
    <div class="users container p-3 border">
      <button @click="fetchData('data')" class="button btn-info mx-1 btn-sm btn">Fetch all Visitors</button>
      <button
        @click="fetchData('customer')"
        class="button btn-success mx-1 btn-sm btn"
      >Fetch all Customers</button>
      <button
        @click="fetchData('seller')"
        class="button btn-primary mx-1 btn-sm btn"
      >Fetch all Sellers</button>

      <p v-if="fetching" class="mt-3 lead text-primary text-center">Loading ...</p>
      <ul v-else class="list-group mt-3">
        <li v-for="user in users" :key="user.email" class="list-group-item">
          <p>
            <strong>Email:</strong>
            {{ user.email }}
          </p>
          <p>
            <strong>Password:</strong>
            {{ user.password }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HTTP",
  data() {
    return {
      submitted: false,
      email: "",
      password: "",
      type: "data",
      users: [],
      fetching: false
    };
  },
  methods: {
    handleSubmit() {
      const vm = this;
      if (this.email.trim().length === 0 || this.password.trim().length === 0) {
        return;
      }
      vm.submitted = true;
      axios
        .post(
          `https://vue-js-noob.firebaseio.com/${vm.type}.json`,
          {
            email: vm.email,
            password: vm.password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          vm.email = "";
          vm.password = "";
          console.log(`User Data added successfully with ID ${res.data.name} `);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          vm.submitted = false;
        });
    },
    fetchData(type) {
      const vm = this;
      vm.fetching = true;
      axios
        .get(`https://vue-js-noob.firebaseio.com/${type}.json`)
        .then(res => {
          vm.users = [];
          for (let key in res.data) {
            vm.users.push(res.data[key]);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          vm.fetching = false;
        });
    }
  }
};
</script>

<style>
@media only screen and (min-width: 1024px) {
  form,
  .users {
    width: 50%;
    margin: auto;
  }
}
p {
  margin-bottom: 0;
}
button {
  box-shadow: none !important;
}
::-webkit-scrollbar {
  width: 0;
}
::selection {
  background-color: rgba(250, 235, 215, 0.753);
  color: rgba(88, 139, 235, 0.493);
}
</style>
