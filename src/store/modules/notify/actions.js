import types from './types'

export default {
  [types.open] ({ commit, state }, obj) {
    commit(types.open, obj)

    setTimeout(() => {
      commit(types.close)
    }, state.timeout)
  },
  [types.close] ({ commit }) {
    commit(types.close)
  }
}
