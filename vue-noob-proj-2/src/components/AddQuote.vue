<template>
  <div class="container my-4">
    <h5 class="text-danger">Add Quote</h5>
    <form @submit="handleSubmit" class="text-center">
      <div class="form-group">
        <textarea required v-model="quote" class="form-control" rows="3"></textarea>
      </div>
      <button class="btn btn-danger btn-sm">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      quote: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.quote.trim().length === 0) {
        return;
      }
      const newQuote = {
        id: uuidv4(),
        quote: this.quote
      };
      this.$emit("addQuote", newQuote);
      this.quote = "";
    }
  }
};
</script>

<style>
button {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
</style>