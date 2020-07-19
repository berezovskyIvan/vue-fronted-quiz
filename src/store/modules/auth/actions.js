import types from './types'

export default {
  [types.updateCheckedStatus] ({ commit }, val) {
    commit(types.updateCheckedStatus, val)
  },
  [types.updateInfo] ({ commit }, obj) {
    commit(types.updateInfo, obj)
  }
}
