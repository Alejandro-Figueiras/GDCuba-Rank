'use server'
import pjson from '../../package.json'

export const getProjectVersion = async () => {
  return pjson.version
}
