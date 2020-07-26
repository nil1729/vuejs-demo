<template>
  <div class="container">
    <h1 class="text-success text-center">State Management with Vuex</h1>
    <hr class="my-2" />
    <app-result :counter="counter" />
    <app-counter @updated="counter+=$event" />
    <hr class="my-3" />
    <app-fetch-todos-btn />
    <app-todos />
  </div>
</template>

<script>
import counter from "./components/counter";
import result from "./components/result";
import fetchTodosBtn from "./components/FetchTodosBtn";
import todos from "./components/Todos";
export default {
  name: "App",
  components: {
    appCounter: counter,
    appResult: result,
    appFetchTodosBtn: fetchTodosBtn,
    appTodos: todos,
  },
  data() {
    return {
      counter: 0,
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
};
</script>

<style>
button {
  box-shadow: none !important;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
