import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'
import MealPlan from '../views/MealPlan.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Login.vue'

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
    path: '/recipes',
    name: 'recipes',
    component: Recipes
  },
  {
    path: '/meal_plans',
    name: 'meal-plans',
    component: MealPlan
  },
  {
    path: '/signup',
    name: 'signup',
    compnonent: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
