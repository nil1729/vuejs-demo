import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddEmployee from '../views/Add.vue'
import ViewEmployee from '../views/About.vue';
import EditEmployee from '../views/Edit';

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
  },
  {
    path: '/edit/:id',
    name: 'EditEmployee',
    component: EditEmployee
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router