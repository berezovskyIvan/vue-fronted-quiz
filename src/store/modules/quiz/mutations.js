import types from './types'

export default {
  [types.create] (state, obj) {
    state.quizzes.push(obj)
  },
  [types.get] (state, arr) {
    state.quizzes = arr
  },
  [types.update] (state, obj) {
    const data = obj.data
    const oldData = obj.oldData

    state.quizzes = state.quizzes.map(item => {
      if (item.user_id === data.user_id && item.url === oldData.url) {
        return data
      } else {
        return item
      }
    })
  },
  [types.delete] (state, obj) {
    const index = state.quizzes.findIndex(item => {
      return item.user_id === obj.userId && item.url === obj.url
    })

    if (index !== -1) {
      state.quizzes.splice(index, 1)
    }
  }
}
