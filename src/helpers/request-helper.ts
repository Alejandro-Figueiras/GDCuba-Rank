import axios from 'axios'
import config from '../../config.js'
import type DictionaryObject from './DictionaryObject.js'

const makeParams = (params: DictionaryObject<string> = {}) => {
  let res = ''
  for (const key of Object.keys(params)) {
    if (res != '') res += '&'
    res += `${key}=${params[key]}`
  }
  return res
}

export const gdRequest = async (target: string, params: {}) => {
  try {
    const response = await axios({
      url: `${config.endpoint + target}.php`,
      method: 'post',
      data: makeParams({ ...params, ...config.params }),
      headers: {
        'User-Agent': ''
      }
    })
    const body: string | -1 = response.data
    let error: { serverError: boolean; response: string } | null = null
    if (body == '-1' || body == -1)
      error = { serverError: true, response: body.toString() }
    else if (
      !body ||
      body.match(/^-\d$/) ||
      body.startsWith('error') ||
      body.startsWith('<')
    ) {
      error = { serverError: true, response: body }
    }

    if (error) {
      console.log(error)
      throw error
    }
    return body.toString()
  } catch (error) {
    console.log(error)
    throw error
  }
}
