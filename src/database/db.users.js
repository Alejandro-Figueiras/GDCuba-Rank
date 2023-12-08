import { addUserCloud, getUsersCloud } from "./cloud/db.functions"

export const addUser = async({ user, password, phone, accountID }) => {
  const response = await addUserCloud({ user, password, phone, accountID });
  if (response.isError()) {
    throw response.error
  } else {
    global.cache.users[user] = (await getUsersCloud(accountID)).rows[0]
  }
}

export const getUser = ({user}) => {
  return global.cache.users[user]
}

export const getAllUsers = () => {
  return global.cache.users
}