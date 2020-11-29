import Vue from 'vue'
import VueRouter from 'vue-router'
import Setup from '../views/Setup.vue'
import GeneratedAnimation from '@/views/GeneratedAnimation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Setup',
    component: Setup
  },
  {
    path: '/animation',
    name: 'GeneratedAnimation',
    component: GeneratedAnimation
  }
]

const router = new VueRouter({
  routes
})

export default router
