import Vue from 'vue'
import types from './types'

export default {
  [types.create] (state, obj) {
    state.my.push(obj)
  },
  [types.getMy] (state, arr) {
    state.my = arr
  },
  [types.getByKey] (state, obj) {
    state.current = obj
  },
  [types.update] (state, obj) {
    const data = obj.data
    const pastSheetId = obj.pastSheetId

    state.my = state.my.map(item => {
      if (item.sheet_id === pastSheetId) {
        return {
          ...data,
          is_publish: item.is_publish,
          key: item.key
        }
      } else {
        return item
      }
    })
  },
  [types.publish] (state, obj) {
    const index = state.my.findIndex(item => item.sheet_id === obj.sheetId)

    if (index !== 1) {
      Vue.set(state.my[index], 'is_publish', true)
      Vue.set(state.my[index], 'key', obj.key)
    }
  },
  [types.delete] (state, obj) {
    const index = state.my.findIndex(item => {
      return item.sheet_id === obj.sheetId
    })

    if (index !== -1) {
      state.my.splice(index, 1)
    }
  }
}
