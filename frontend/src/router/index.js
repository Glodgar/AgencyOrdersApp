import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/contact',
    name: 'Contact',

    component: () => import('../views/Contact.vue')
  },
  {
    path: '/newOrder',
    name: 'NewOrder',

    component: () => import('../views/NewOrder.vue')
  },
  {
    path: '/orders',
    name: 'Orders',

    component: () => import('../views/Orders')
  },
  {
    path: '/newUser',
    name: 'NewUser',

    component: () => import('../views/NewUser.vue')
  },
  {
    path: '/users',
    name: 'Users',

    component: () => import('../views/Users')
  },
  {
    path: '/user/:id',
    name: 'User',
    props: true,

    component: () => import('../views/User')
  },
  {
    path: '/order/:id',
    name: 'Order',
    props: true,

    component: () => import('../views/Order')
  },
  //DO USUNIECIA
  {
    path: '/charts',
    name: 'Charts',
    props: true,

    component: () => import('../views/Charts')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
