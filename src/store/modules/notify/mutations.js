import types from './types'

export default {
  [types.open] (state, obj) {
    state.isOpen = true
    state.val = obj.val
    state.type = obj.type
  },
  [types.close] (state) {
    state.isOpen = false
    state.val = ''
    state.type = ''
  }
}
