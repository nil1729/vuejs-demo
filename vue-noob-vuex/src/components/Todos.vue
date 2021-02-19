<template>
  <div class="container p-4">
    <h5 class="text-info">
      Total Todos:
      <span class="text-dark">{{ $store.state.todos.length }}</span>
    </h5>
    <h4 v-if="$store.state.loading" class="text-secondary text-center">Loading ...</h4>
    <ul v-else class="list-group">
      <div
        v-for="(todo, i) in todos"
        :key="todo.id"
        class="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">
            <span class="text-danger">{{ i + 1 }}</span>
            {{ todo.title }}
          </h5>
          <small class="text-success">{{ !todo.completed ? '' : 'Completed'}}</small>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todos",
  computed: {
    todos() {
      if (this.$store.state.showCompleted) {
        return this.$store.getters.completedTodos;
      } else {
        return this.$store.state.todos;
      }
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>