import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddEmployee from '../views/Add.vue'
import ViewEmployee from '../views/About.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddEmployee',
    component: AddEmployee
  },
  {
    path: '/view/:id',
    name: 'ViewEmployee',
    component: ViewEmployee
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router