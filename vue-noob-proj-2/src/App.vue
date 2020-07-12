<template>
  <div class="container">
    <h1 class="text-center text-success">Wonderful Quotes</h1>
    <app-progress :progress="progress"></app-progress>
    <app-add-quote @addQuote="addNewQuote"></app-add-quote>
    <app-quotes @deleteQuote="deleteQuote" v-if="quotes.length!==0" :quotes="quotes"></app-quotes>
  </div>
</template>

<script>
import Progress from "./components/Progress";
import AddQuote from "./components/AddQuote";
import Quotes from "./components/Quotes";
export default {
  name: "App",
  components: {
    appProgress: Progress,
    appAddQuote: AddQuote,
    appQuotes: Quotes
  },
  data() {
    return {
      progress: 0,
      quotes: []
    };
  },
  methods: {
    addNewQuote(ev) {
      if (this.progress === 10) {
        alert("Too Many Quotes, Delete some before adding new ones!");
        return;
      }
      this.quotes = [ev, ...this.quotes];
      this.saveData();
      this.progress++;
    },
    deleteQuote(ev) {
      this.quotes = this.quotes.filter(item => item.id !== ev);
      this.saveData();
      this.progress--;
    },
    saveData() {
      localStorage.setItem("quotes", JSON.stringify(this.quotes));
    }
  },
  created() {
    const data = localStorage.getItem("quotes");
    if (data) {
      this.quotes = JSON.parse(localStorage.getItem("quotes"));
      this.progress = this.quotes.length;
    }
  }
};
</script>

<style>
::selection {
  background-color: #f5e8e8e3;
  color: rgba(144, 129, 129, 0.794);
}
::-webkit-scrollbar {
  width: 0;
}
</style>
