'use server'
import { hash } from 'bcryptjs'
import { getAccount } from '@/robtop/getAccount'
import { responseText } from '@/locales/siteText'
import { addUser, findUser } from '@/database/db.users'
import { addGDAccount, getGDAccount } from '@/database/db.gdaccounts'

export const register = async (data: {
  username: string
  password: string
  phone: string
}) => {
  let errorMessage = 'La cuenta solicitada no existe en Geometry Dash'

  const fields = {
    user: data.username.trim(),
    password: data.password.trimEnd(),
    phone: data.phone.trim(),
    accountid: -1
  }

  const accountRegistered = await findUser({ user: fields.user })
  console.log(accountRegistered)
  if (!accountRegistered || !accountRegistered.accountid) {
    const gdAccount = await getAccount(data.username)
    if (gdAccount !== -1) {
      const passwordEncrypt = await hash(fields.password, 5)
      fields.password = passwordEncrypt
      fields.user = gdAccount.username
      fields.accountid = gdAccount.accountid

      const query = await addUser(fields)
      const accountLocal = await getGDAccount(gdAccount.username)
      if (accountLocal == undefined) {
        await addGDAccount({ account: gdAccount })
      }
      if (query) {
        return JSON.stringify({
          message: 'Usuario creado satisfactoriamente',
          status: 200
        })
      } else {
        errorMessage = responseText.error
      }
    } else {
      errorMessage = `La cuenta de GD ${fields.user} no fue encontrada`
    }
  } else {
    errorMessage = `La cuenta ${fields.user} ya fue solicitada`
  }

  return JSON.stringify({
    error: errorMessage,
    status: 500
  })
}
