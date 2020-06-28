import axios from 'axios'
import types from './types'

export default {
  async [types.create] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.post(types.create, body, options)

    return result
  },
  async [types.getMy] (context) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.get(types.getMy, options)

    return result
  },
  async [types.getByKey] (context, key) {
    const query = `?key=${key}`
    const url = types.getByKey + query
    const result = await axios.get(url)

    return result
  },
  async [types.update] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.put(types.update, body, options)

    return result
  },
  async [types.publish] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.patch(types.publish, body, options)

    return result
  },
  async [types.stopPublishing] (context, body) {
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.patch(types.stopPublishing, body, options)

    return result
  },
  async [types.delete] (context, obj) {
    const query = `?sheetId=${obj.sheetId}`
    const url = types.delete + query
    const token = context.rootState.auth.currentUser.wc.access_token
    const options = {
      headers: {
        'ACCESS-TOKEN': token
      }
    }

    const result = await axios.delete(url, options)

    return result
  }
}
