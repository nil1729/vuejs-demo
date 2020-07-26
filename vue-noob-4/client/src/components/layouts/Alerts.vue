<template>
  <div class="alerts-div">
    <div class="toast" :class="{show: $store.state.alerts}" role="alert">
      <div class="toast-header">
        <strong class="mr-auto text-danger">{{ $store.state.alerts && $store.state.alerts.type }}</strong>
        <button @click="$store.commit('CLEAR_ALERT')" type="button" class="ml-2 mb-1 close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">{{ $store.state.alerts && $store.state.alerts.msg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppAlert",
};
</script>

<style scoped>
.alerts-div {
  position: absolute;
  top: 2em;
  right: 2em;
}
.toast {
  background-color: rgba(216, 155, 155, 0.26);
}
.toast.show {
  transition: ease 0.3s;
}
</style>