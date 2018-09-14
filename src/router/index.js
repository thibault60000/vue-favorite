import Vue from 'vue'
import Router from 'vue-router'

import AdminPage from '@/components/AdminPage'
import Home from '@/components/Home'
import firebase from 'firebase'
import Cours from '@/components/Cours'
import Favorites from '@/components/Favorites'
import Inscription from '@/components/Inscription'
import Course from '@/components/Course'
import CreateCourse from '@/components/CreateCourse'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cours',
      name: 'Cours',
      component: Cours,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/:id',
      name: 'Course',
      component: Course,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createcourse',
      name: 'CreateCourse',
      component: CreateCourse,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: Inscription
    },
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: AdminPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('home')
  else if (!requiresAuth && currentUser) next('adminpage')
  else next()
})

export default router
