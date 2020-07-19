import types from './types'

export default {
  [types.updateCheckedStatus] (state, val) {
    state.wasCheckedStatus = val
  },
  [types.updateInfo] (state, obj) {
    state.isSignedIn = obj.isSignedIn
    state.currentUser = obj.currentUser
  }
}
