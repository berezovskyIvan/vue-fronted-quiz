import Vue from 'vue'
import config from '#/config'
import { LoaderPlugin } from 'vue-google-login'
import store from '@/store'

Vue.use(LoaderPlugin, {
  client_id: config.google_client_id,
  scope: 'https://www.googleapis.com/auth/spreadsheets'
})

function getAuthInfo ($event) {
  const authInfo = {
    isSignedIn: $event.isSignedIn.get(),
    currentUser: $event.currentUser.get()
  }

  store.dispatch('auth/updateCheckedStatus', true)
  store.dispatch('auth/updateInfo', authInfo)
}

Vue.GoogleAuth.then(getAuthInfo)
