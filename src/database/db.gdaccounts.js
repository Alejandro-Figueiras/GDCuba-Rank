'use server'
export const getGDAccount = async(username) => {
  return global.cache.gdaccounts[username]
}

export const getAllCubans = async() => {
  return Object.values(global.cache.gdaccounts);
}