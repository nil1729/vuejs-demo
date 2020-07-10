<template>
  <div>
    <div class="container bg-light p-4">
      <h1 class="text-center">App Component</h1>
      <p class="lead text-center">I love {{ name }}</p>
      <p class="lead text-center">I am using {{ db }} as Database</p>
      <button @click="name = 'React JS'" class="btn btn-sm btn-info">Change Framework</button>
      <hr />
      <div class="row mt-3 border border-primary p-2">
        <div class="col-md-6 col-sm-12">
          <app-comp-1
            :db="db"
            :resetFn="resetName"
            @nameWasChanged="name = $event"
            :framework="name"
          ></app-comp-1>
        </div>
        <div class="col-md-6 col-sm-12">
          <app-comp-2 @changeDB="db = $event" :db="db"></app-comp-2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comp1 from "./components/Comp-1";
import Comp2 from "./components/Comp-2";
export default {
  name: "Main-App",
  components: {
    "app-comp-1": Comp1,
    "app-comp-2": Comp2
  },
  data: function() {
    return {
      // name: 1
      name: "Vue JS",
      db: "Firestore"
    };
  },
  methods: {
    resetName() {
      this.name = "Vannila JS";
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
* {
  user-select: none;
}
</style>
