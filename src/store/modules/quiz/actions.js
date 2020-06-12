import axios from 'axios'
import types from './types'

export default {
  async [types.create] (context, obj) {
    const data = obj
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'X-AUTH-TOKEN': token
      }
    }

    const result = await axios.post(types.create, data, options)

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

  async [types.update] (context, data) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'X-AUTH-TOKEN': token
      }
    }

    const result = await axios.put(types.update, data, options)

    return result
  },

  async [types.delete] (context, obj) {
    let query = `?userId=${obj.userId}&url=${obj.url}`

    if (obj.gid) {
      query += `&gid=${obj.gid}`
    }

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
