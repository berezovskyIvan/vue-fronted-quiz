import types from './types'

export default {
  [types.updateCheckedAuthStatus] (state, val) {
    state.wasCheckedAuthStatus = val
  },
  [types.updateAuthInfo] (state, obj) {
    state.isSignedIn = obj.isSignedIn
    state.currentUser = obj.currentUser
  }
}
