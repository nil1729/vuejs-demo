import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lyric from '../views/Lyric.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/track/:id',
    name: 'Lyric',
    component: Lyric
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router