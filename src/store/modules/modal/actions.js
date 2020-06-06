import types from './types'

export default {
  [types.open] ({ commit }, obj) {
    commit(types.open, obj)
  },
  [types.close] ({ commit }) {
    commit(types.close)
  }
}
