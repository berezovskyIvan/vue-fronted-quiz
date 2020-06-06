import types from './types'

export default {
  [types.create] ({ commit }, obj) {
    console.log('quiz', obj)
  }
}
