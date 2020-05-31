import Vue from 'vue'
import config from '#/config'
import { LoaderPlugin } from 'vue-google-login'
import store from '@/store'

Vue.use(LoaderPlugin, {
  client_id: config.google_client_id
})

function getAuthInfo ($event) {
  const authInfo = {
    isSignedIn: $event.isSignedIn.get(),
    currentUser: $event.currentUser.get()
  }

  store.dispatch('auth/updateCheckedAuthStatus', true)
  store.dispatch('auth/updateAuthInfo', authInfo)
}

Vue.GoogleAuth.then(getAuthInfo)
