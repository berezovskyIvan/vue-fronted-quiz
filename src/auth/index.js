import Vue from 'vue'
import config from '#/config'
import { LoaderPlugin } from 'vue-google-login'
import store from '@/store'

Vue.use(LoaderPlugin, {
  client_id: config.google.clientId,
  scope: config.google.scope
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
