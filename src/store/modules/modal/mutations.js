import types from './types'
import { updateObjectReactive } from '@/utlis'

const defaultObj = {
  isOpen: false,
  component: null,
  width: null,
  height: null,
  data: {},
  loading: {
    is: false,
    height: null,
    width: null
  }
}

export default {
  [types.open] (state, obj) {
    if (obj && Object.keys(obj).length) {
      updateObjectReactive(state, obj)
    } else {
      updateObjectReactive(state, defaultObj)
    }
  },
  [types.close] (state) {
    updateObjectReactive(state, defaultObj)
  },
  [types.showLoader] (state, obj) {
    state.loading = {
      is: true,
      height: obj.height,
      width: obj.width
    }
  },
  [types.hideLoader] (state) {
    state.loading = {
      is: false,
      height: null,
      width: null
    }
  }
}
