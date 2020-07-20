import types from './types'

export default {
  [types.open] (state, obj) {
    state.isOpen = true
    state.val = obj.val
    state.type = obj.type

    if (obj.width) {
      state.width = obj.width
    }
  },
  [types.close] (state) {
    state.isOpen = false
    state.val = ''
    state.type = ''
    state.width = 250
  }
}
