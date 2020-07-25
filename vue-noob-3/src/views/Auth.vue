<template>
  <div class="container z-depth-1">
    <div class="row">
      <h4 class="center red-text">{{ mode.toUpperCase() }}</h4>
      <form @submit.prevent="handleSubmit" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input required v-model="email" type="email" class="validate" />
            <label for="icon_prefix">Email Address</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">security</i>
            <input minlength="6" v-model="password" type="password" class="validate" />
            <label for="icon_prefix">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button class="btn green waves-effect waves-light" type="submit">
              {{ submitted ? 'loading...' : mode }}
              <i class="material-icons right">send</i>
            </button>
            <button
              type="button"
              style="margin-left: 1em"
              class="btn teal"
              @click="mode = mode === 'login' ? 'register' : 'login'"
            >Switch to {{mode === 'login' ? 'register' : 'login'}}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { firebaseApp } from "@/firebase";
import M from "materialize-css/dist/js/materialize";
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
  methods: {
    handleSubmit: async function () {
      this.submitted = true;
      if (!this.validateEmail(this.email)) {
        this.submitted = false;
        return M.toast({ html: "Please enter a valid Email Address" });
      }
      const err = await this.handleAuth();
      if (err) {
        this.submitted = false;
        return M.toast({ html: err.message });
      }
      M.toast({ html: `You are Logged in as ${this.email}` });
      this.email = "";
      this.password = "";
      this.$router.push("/");
    },
    handleAuth: async function () {
      if (this.mode === "login") {
        try {
          await firebaseApp
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
        } catch (e) {
          return e;
        }
      } else if (this.mode === "register") {
        try {
          await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password);
        } catch (e) {
          return e;
        }
      }
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

<style scoped>
.container.z-depth-1 {
  padding: 10px 1em 0 1em;
  margin-top: 3em;
}
@media screen and (min-width: 1024px) {
  .container.z-depth-1 {
    width: 60%;
  }
}
</style>