<template>
  <div>
    <div v-for="i in 3" :key="i" :id="i" class="container my-2">
      <h3 class="text-danger">About {{ i }}</h3>
      <p
        class="lead"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid consectetur sint numquam voluptatem. Labore corporis nulla dolorum fugiat quaerat earum delectus eaque harum, debitis, velit aliquid distinctio, eveniet eum deleniti repellendus reiciendis vel! Laboriosam repudiandae ab ullam reprehenderit quidem.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container {
  height: 60vh;
  padding: 1rem;
  background-color: aliceblue;
}
</style>