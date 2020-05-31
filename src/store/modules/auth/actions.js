import types from './types'

export default {
  [types.updateCheckedAuthStatus] ({ commit }, val) {
    commit(types.updateCheckedAuthStatus, val)
  },
  [types.updateAuthInfo] ({ commit }, obj) {
    commit(types.updateAuthInfo, obj)
  }
}
