import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import QuizPage from '@/pages/QuizPage'
import PageNotFound from '@/pages/PageNotFound'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'main',
      path: '/',
      component: MainPage
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      meta: {
        requiredAuth: true
      },
      component: Dashboard
    },
    {
      name: 'quiz',
      path: '/:key',
      component: QuizPage
    },
    {
      name: 'page-not-found',
      path: '*',
      component: PageNotFound
    },
  ]
})
