<template>
  <form @submit.prevent="handleSubmit" class="col s12">
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">account_circle</i>
        <input required v-model="userInput.name" type="text" class="validate" />
        <label :class="{active: employee}" for="icon_prefix">Full Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">visibility</i>
        <input required v-model="userInput.__id" type="text" class="validate" />
        <label :class="{active: employee}" for="icon_prefix">Employee ID</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">business</i>
        <input required v-model="userInput.dept" type="text" class="validate" />
        <label :class="{active: employee}" for="icon_prefix">Department</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">local_library</i>
        <input required v-model="userInput.post" type="text" class="validate" />
        <label :class="{active: employee}" for="icon_prefix">Employee Position</label>
      </div>
    </div>
    <div class="row center">
      <button class="btn waves-effect waves-light" type="submit" name="action">
        {{ submitted ? 'Loding...': 'Submit' }}
        <i class="material-icons right">send</i>
      </button>
    </div>
  </form>
</template>

<script>
import M from "materialize-css/dist/js/materialize";
export default {
  name: "appForm",
  props: ["employee"],
  data() {
    return {
      userInput: {
        name: this.employee ? this.employee.name : "",
        __id: this.employee ? this.employee.__id : "",
        dept: this.employee ? this.employee.dept : "",
        post: this.employee ? this.employee.post : "",
        id: this.employee ? this.employee.id : ""
      },
      submitted: false
    };
  },
  methods: {
    handleSubmit() {
      if (this.checkValidity()) {
        this.$emit("submittedForm", {
          ...this.userInput,
          type: `${this.employee ? "edit" : "add"}`
        });
        this.submitted = true;
        this.userInput = { name: "", __id: "", dept: "", post: "", id: "" };
      } else {
        M.toast({
          html: `Employee with ${this.userInput.__id} already exists`
        });
      }
    },
    checkValidity() {
      const vm = this;
      const dp = this.$attrs.employees.findIndex(
        item => vm.userInput.__id === item.__id
      );
      if (dp < 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
</style>