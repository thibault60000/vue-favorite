import Vue from 'vue'

/* Element UI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/fr'

/* Firebase */
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/firestore'

import App from './App'
import router from './router'
import VueResource from 'vue-resource'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUserCircle, faGraduationCap, faNewspaper, faUserPlus, faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHome, faUserCircle, faGraduationCap, faNewspaper, faUserPlus, faGrinBeamSweat)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(Vuefire)
Vue.use(VueResource)

Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

const moment = require('moment')
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
  moment
})

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

/* Firestore */
export const db = firebase.firestore()
export const st = firebase.storage().ref()

const settings = {timestampsInSnapshots: true}
db.settings(settings)
