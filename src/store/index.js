import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import quiz from './modules/quiz'
import modal from './modules/modal'

export default new Vuex.Store({
  modules: {
    auth,
    quiz,
    modal
  }
})
