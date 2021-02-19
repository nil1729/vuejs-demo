<template>
  <div class="container">
    <button @click="fetchTodos(start+=10)" class="btn btn-sm btn-primary">Fetch Todos</button>
    <button
      @click="$store.commit('SET_TODO_TYPE', false)"
      class="btn btn-sm btn-warning text-dark ml-2"
    >Show All Todos</button>
    <button
      @click="$store.commit('SET_TODO_TYPE', true)"
      class="btn btn-sm btn-success ml-2"
    >Show Only Completed Todos</button>
    <button class="disabled btn btn-sm btn-info ml-2">{{ todoType }}</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppFetchTodosBtn",
  data() {
    return {
      start: -10,
    };
  },
  computed: {
    ...mapGetters(["todoType"]),
  },
  methods: {
    ...mapActions(["fetchTodos"]),
  },
};
</script>

<style>
.disabled {
  pointer-events: none !important;
}
</style>