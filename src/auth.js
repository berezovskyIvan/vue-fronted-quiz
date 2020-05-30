import Vue from 'vue'
import { LoaderPlugin } from 'vue-google-login'
import config from '#/config'

Vue.use(LoaderPlugin, {
  client_id: config.google_client_id
})

Vue.GoogleAuth.then(getAuthInfo)

function getAuthInfo ($event) {
  console.log('isSignedIn', $event.isSignedIn.get())
  console.log('currentUser', $event.currentUser.get())
}
