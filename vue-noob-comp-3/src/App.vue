<template>
  <div class="container">
    <h1 class="display-4 text-success text-center">Understanding Vue JS Components</h1>
    <br />
    <div class="jumbotron py-3">
      <app-quote :author="author" :quote="quote"></app-quote>
    </div>
    <br />
    <div class="jumbotron py-3">
      <app-slots>
        <p class="lead-vue" slot="quote">
          {{ quote }}
          <br />
          <small class="small-vue">-By {{ author }}</small>
        </p>
        <p class="lead">I love to code in JavaScript ( Default Slot )</p>
        <p class="lead" slot="mevn">I am a MEVN stack Developer</p>
      </app-slots>
    </div>
    <br />
    <div class="jumbotron py-3">
      <h4 class="text-center text-success">Dynamic Component</h4>
      <button
        @click="selectedComponent = 'appCompOne'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component 1</button>
      <button
        @click="selectedComponent = 'appCompTwo'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component 2</button>
      <button
        @click="selectedComponent = 'appCompThree'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component 3</button>
      <components :is="selectedComponent">
        <p class="lead">This is Component One using Slots</p>
        <p class="lead">Node JS is a JavaScript Runtime Environment</p>
      </components>
    </div>
    <br />
    <div class="jumbotron py-3">
      <h4 class="text-center text-success">Lifecycle Hooks of Dynamic Component</h4>
      <button
        @click="selectedHookComponent = 'appHookOne'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component one</button>
      <button
        @click="selectedHookComponent = 'appHookTwo'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component two</button>
      <components :is="selectedHookComponent"></components>
      <hr class="my-3" />
      <button
        @click="selectedAliveComponent = 'appAliveOne'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component one</button>
      <button
        @click="selectedAliveComponent = 'appAliveTwo'"
        class="btn btn-sm btn-info mr-2 mb-3"
      >Component two</button>
      <keep-alive>
        <components :is="selectedAliveComponent"></components>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Quote from "./components/Quote";
import Slots from "./components/Slots";
import CompOne from "./components/Comp1";
import CompTwo from "./components/Comp2";
import CompThree from "./components/Comp3";
import hookOne from "./components/Hook1";
import hookTwo from "./components/Hook2";
import aliveOne from "./components/Alive1";
import aliveTwo from "./components/Alive2";
export default {
  name: "App",
  components: {
    appQuote: Quote,
    appSlots: Slots,
    appCompOne: CompOne,
    appCompTwo: CompTwo,
    appCompThree: CompThree,
    appHookOne: hookOne,
    appHookTwo: hookTwo,
    appAliveOne: aliveOne,
    appAliveTwo: aliveTwo
  },
  data() {
    return {
      quote:
        "Any app that can be written in JavaScript, will eventually be written in JavaScript.",
      author: "Jeff Atwood",
      selectedComponent: "appCompOne",
      selectedHookComponent: "appHookOne",
      selectedAliveComponent: "appAliveOne"
    };
  }
};
</script>

<style scoped>
/* Not Working */
.lead-vue {
  font-size: 1.25rem;
  font-weight: 300;
}
.small-vue {
  font-size: 80%;
  font-weight: 400;
  color: #aea79f !important;
}
</style>
