import axios from 'axios'
import config from '../../config.js'

const makeParams = (params = {}) => {
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
    const body: string = response.data
    let error: { serverError: boolean; response: string }
    if (body == '-1') error = { serverError: true, response: body }
    if (
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
    return body
  } catch (error) {
    console.log(error)
    throw error
  }
}
