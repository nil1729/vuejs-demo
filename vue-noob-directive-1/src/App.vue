<template>
  <div class="container">
    <h1 class="text-center text-success">Understanding Custom Vue Directives</h1>
    <hr class="my-3" />
    <div class="container p-3 border">
      <h4 class="text-primary">Built in Directives</h4>
      <p v-text="'I love Vue JS'"></p>
      <p v-html="'<strong>This is some bold text</strong>'"></p>
    </div>
    <div class="container my-4 p-3 border">
      <h4 class="text-primary">Custom Directives</h4>
      <p v-bg-color class="lead">This is some Text</p>
      <p v-bg-user-color="'lightgreen'" class="lead">This is some text</p>
      <p v-bg-color-arg:background="'teal'" class="lead">This is some text</p>
      <p v-bg-color-arg="'teal'" class="lead">This is some text</p>
      <p
        v-bg-color-mod:background.delayed="'bisque'"
        class="lead"
      >This text background will be colored blue after 5 seconds</p>
      <p v-bg-color-mod.delayed="'blue'" class="lead">This text will be colored blue after 5 seconds</p>
      <p
        v-local-bg-user-color="'lightpink'"
        class="lead"
      >This text is colored using local Custom Directives</p>
      <p
        v-local-bg-color-final:background.delayed.blink="{mainColor: 'burlywood', secondColor: 'violet', delay: 500}"
        class="lead"
      >This text color is blinking using local Custom Directives</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  directives: {
    "local-bg-user-color": {
      bind(el, binding) {
        el.style.backgroundColor = binding.value;
      }
    },
    "local-bg-color-final": {
      bind(el, binding) {
        let delay = 0;
        if (binding.modifiers["delayed"]) {
          delay = 5000;
        }
        if (binding.modifiers["blink"]) {
          setTimeout(() => {
            let mainColor = binding.value.mainColor || "cyan";
            let secondColor = binding.value.secondColor || "bisque";
            let currentColor = mainColor;
            setInterval(() => {
              currentColor === mainColor
                ? (currentColor = secondColor)
                : (currentColor = mainColor);
              if (binding.arg == "background") {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, binding.value.delay || 1000);
          }, delay);
        } else {
          setTimeout(() => {
            if (binding.arg == "background") {
              el.style.backgroundColor = binding.value.mainColor || "cyan";
            } else {
              el.style.color = binding.value.mainColor || "cyan";
            }
          }, delay);
        }
      }
    }
  }
};
</script>

<style>
::selection {
  color: rgb(76, 0, 255);
  background-color: aliceblue;
}
p {
  margin-bottom: 0;
}
p.lead {
  margin-bottom: 10px;
  padding: 5px;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
