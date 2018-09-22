import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import firebase from 'firebase'
import OneCoursePage from '@/pages/OneCoursePage'
import SignUpPage from '@/pages/SignUpPage'
import CoursesPage from '@/pages/CoursesPage'
import CreateCoursePage from '@/pages/CreateCoursePage'
import MyAccountPage from '@/pages/MyAccountPage'

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
      component: HomePage
    },
    {
      path: '/courses',
      name: 'Cours',
      component: CoursesPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/:id',
      name: 'Le cours',
      component: OneCoursePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myaccount',
      name: 'MonCompte',
      component: MyAccountPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createcourse',
      name: 'CreateCourse',
      component: CreateCoursePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Inscription',
      component: SignUpPage
    },
    {
      path: '/landingpage',
      name: 'LandingPage',
      component: LandingPage,
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
  else if (!requiresAuth && currentUser) next('landingpage')
  else next()
})

export default router
