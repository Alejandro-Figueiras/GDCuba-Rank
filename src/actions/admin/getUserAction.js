'use server'

export const getUserAction = async({user}) => {
  if (user) {
    const info = {...global.cache.users[user]};
    if (info) info.password = null;
    return JSON.stringify(info);
  }
  return null;
}