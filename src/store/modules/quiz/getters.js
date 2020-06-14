import types from './types'
import store from '@/store'

export default {
  [types.myQuizzes]: state => {
    const userId = store.state.auth.currentUser.Ea
    return state.list.filter(item => item.user_id === userId)
  }
}
