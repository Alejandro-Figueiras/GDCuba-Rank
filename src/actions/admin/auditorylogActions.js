'use server'

export const getLatestAction = async() => {
  // TODO authorize
  return JSON.stringify(await getLatest(100))
}