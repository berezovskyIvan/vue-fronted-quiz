import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import quiz from './modules/quiz'
import modal from './modules/modal'
import notify from './modules/notify'

export default new Vuex.Store({
  modules: {
    auth,
    quiz,
    modal,
    notify
  }
})
