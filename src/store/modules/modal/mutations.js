import types from './types'
import { updateObjectReactive } from '@/utlis'

const defaultObj = {
  isOpen: false,
  component: null,
  width: null,
  height: null,
  data: {}
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
  }
}
