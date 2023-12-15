'use server'
export const getGDAccount = async(username) => {
  return global.cache.gdaccounts[username]
}