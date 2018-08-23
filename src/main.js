// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

/* Element UI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/fr'

/* Firebase */
import firebase from 'firebase'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

let app
let config = {
  apiKey: 'AIzaSyCF0eYOihC3rJdVIpiKWPlEVxrbhX-tb2I',
  authDomain: 'vue-favorites.firebaseapp.com',
  databaseURL: 'https://vue-favorites.firebaseio.com',
  projectId: 'vue-favorites',
  storageBucket: 'vue-favorites.appspot.com',
  messagingSenderId: '717538122188'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
