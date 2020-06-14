import axios from 'axios'
import types from './types'

export default {
  async [types.create] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'X-AUTH-TOKEN': token
      }
    }

    const result = await axios.post(types.create, body, options)

    return result
  },

  [types.get] (context) {
    axios.get(types.get).then(({ data }) => {
      context.commit(types.get, data)
    }).catch(err => {
      if (err.response && err.response.statusText) {
        console.error(err.response.statusText)
      } else {
        console.error(err.response)
      }
    })
  },

  async [types.update] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'X-AUTH-TOKEN': token
      }
    }

    const result = await axios.put(types.update, body, options)

    return result
  },

  async [types.delete] (context, obj) {
    const query = `?userId=${obj.userId}&sheetId=${obj.sheetId}`
    const url = types.delete + query
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'X-AUTH-TOKEN': token
      }
    }

    const result = await axios.delete(url, options)

    return result
  }
}
