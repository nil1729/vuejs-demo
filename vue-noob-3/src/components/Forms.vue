<template>
  <form @submit.prevent="handleSubmit" class="col s12">
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">account_circle</i>
        <input v-model="userInput.name" type="text" class="validate" />
        <label for="icon_prefix">Full Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">visibility</i>
        <input v-model="userInput.__id" type="text" class="validate" />
        <label for="icon_prefix">Employee ID</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">business</i>
        <input v-model="userInput.dept" type="text" class="validate" />
        <label for="icon_prefix">Department</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">local_library</i>
        <input v-model="userInput.post" type="text" class="validate" />
        <label for="icon_prefix">Employee Position</label>
      </div>
    </div>
    <div class="row center">
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Submit
        <i class="material-icons right">send</i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "appForm",
  data() {
    return {
      userInput: {
        name: "",
        __id: "",
        dept: "",
        post: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submittedForm", { ...this.userInput });
      this.userInput = { name: "", __id: "", dept: "", post: "" };
    }
  }
};
</script>

<style>
</style>