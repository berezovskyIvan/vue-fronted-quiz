import types from './types'

export default {
  [types.open] ({ commit }, obj) {
    commit(types.open, obj)
  },
  [types.close] ({ commit }) {
    commit(types.close)
  },
  [types.showLoader] ({ commit }, obj) {
    commit(types.showLoader, obj)
  },
  [types.hideLoader] ({ commit }) {
    commit(types.hideLoader)
  }
}
