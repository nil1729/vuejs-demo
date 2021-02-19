<template>
  <div class="container p-4">
    <h3 class="text-center">{{ mode | toUpperCase }}</h3>
    <div class="toast" :class="{show: $attrs.alerts }" role="alert">
      <div class="toast-header">
        <strong class="mr-auto text-danger">{{ $attrs.alerts && $attrs.alerts.code }}</strong>
        <button @click="$attrs.clearAlerts()" type="button" class="ml-2 mb-1 close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">{{ $attrs.alerts && $attrs.alerts.message }}</div>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email address</label>
        <input
          required
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter Email Address"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          minlength="6"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        class="btn btn-sm btn-success"
      >{{ submitted ? 'loading ...' : mode | toUpperCase }}</button>
      <button
        @click="changeMode"
        type="button"
        class="btn btn-sm btn-info mx-2"
      >Switch to {{ mode === 'login' ? 'Register': 'Login' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AppAuthPage",
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      submitted: false,
    };
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    },
  },
  watch: {
    "$attrs.isAuthenticated"() {
      if (this.$attrs.isAuthenticated) {
        this.$router.push({
          name: "Home",
        });
      }
    },
  },
  beforeMount() {
    if (this.$attrs.isAuthenticated) {
      this.$router.push({
        name: "Home",
      });
    }
  },
  methods: {
    handleSubmit: async function () {
      this.submitted = true;
      if (!this.validateEmail(this.email)) {
        this.submitted = false;
        return this.$attrs.createAlert({
          code: "Validation Error",
          message: "Please enter a valid Email Address",
        });
      }
      const err = await this.$attrs.handleAuth({
        email: this.email,
        password: this.password,
        mode: this.mode,
      });
      if (err) {
        this.submitted = false;
        return this.$attrs.createAlert(err);
      }
      this.email = "";
      this.password = "";
    },
    validateEmail(email) {
      const reg = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return reg.test(email);
    },
    changeMode() {
      this.mode = this.mode === "login" ? "register" : "login";
    },
  },
};
</script>

<style>
form {
  width: 50%;
  margin: auto;
}
input,
button {
  box-shadow: none !important;
  outline: none !important;
}
.toast {
  position: absolute;
  top: 2em;
  right: 2em;
  background-color: rgba(216, 155, 155, 0.26);
}
.toast.show {
  transition: ease 0.3s;
}
@media screen and (max-width: 768px) {
  form {
    width: auto;
  }
}
</style>