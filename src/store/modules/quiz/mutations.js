import types from './types'

export default {
  [types.create] (state, obj) {
    state.list.push(obj)
  },
  [types.get] (state, arr) {
    state.list = arr
  },
  [types.update] (state, obj) {
    const data = obj.data
    const pastSheetId = obj.pastSheetId

    state.list = state.list.map(item => {
      if (item.user_id === data.user_id && item.sheet_id === pastSheetId) {
        return data
      } else {
        return item
      }
    })
  },
  [types.delete] (state, obj) {
    const index = state.list.findIndex(item => {
      return item.user_id === obj.userId && item.sheet_id === obj.sheetId
    })

    if (index !== -1) {
      state.list.splice(index, 1)
    }
  }
}
