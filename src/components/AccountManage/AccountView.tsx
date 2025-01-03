'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Spinner
} from '@nextui-org/react'
import { useGDIcon } from '@/robtop/iconkit/useGDIcon'
import { getAccountAction } from '@/actions/accounts/getAccountAction'
import AccountStatsRow from '../Admin/UserModalPanel/AccountStatsRow'
import AccountIconsRow from '../Admin/UserModalPanel/AccountIconsRow'
import AccountStuff from './AccountStuff'
import { getStuffItemsAction } from '@/actions/accounts/stuffActions'
import RecordsLinkButton from '../Records/RecordsLinkButton'
import { useRouter } from 'next/navigation'
import { type Account } from '@/models/Account'
import StuffItem from '@/models/StuffItem'
export default function AccountView({
  manage = false,
  username
}: {
  manage?: boolean
  username: string | undefined
}) {
  const { icon: iconAvatar } = useGDIcon({
    type: 'cube',
    username: username
  })

  const [account, setAccount] = useState(undefined as undefined | Account)
  const [accountStuff, setAccountStuff] = useState(
    undefined as undefined | StuffItem[]
  )
  const router = useRouter()

  const loadAccount = useCallback(async () => {
    try {
      if (!username) return
      const accountResponse = await getAccountAction({ username: username })
      if (!accountResponse) {
        router.push('/')
        return
      }
      const account: Account = JSON.parse(accountResponse) as Account
      const stuff = JSON.parse(
        await getStuffItemsAction({ accountid: account.accountid })
      ) as StuffItem[]
      setAccount(account)
      setAccountStuff(stuff)
    } catch {
      router.push('/')
    }
  }, [username, router])

  useEffect(() => {
    if (username == undefined) return
    loadAccount()
  }, [username, loadAccount])

  return (
    <>
      <Card className='w-[800px] max-w-[1000px]'>
        <CardHeader className='flex justify-between'>
          <div className='flex flex-row gap-3'>
            <Image alt='Cube' radius='none' src={iconAvatar} width={40} />
            <div className='flex flex-col justify-center'>
              <p className='text-2xl'>{username}</p>
            </div>
          </div>
          <div className='flex'>
            {username && <RecordsLinkButton username={username} mini={true} />}
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='flex flex-col items-center justify-center gap-3'>
          {account != undefined ? (
            <>
              <AccountStatsRow user={account} />
              <AccountIconsRow user={account} />
              <Divider />
              <AccountStuff
                account={account}
                setAccount={setAccount}
                stuffItems={accountStuff}
                setStuffItems={setAccountStuff}
                loadAccount={loadAccount}
                manage={manage}
              />
            </>
          ) : (
            <div className='flex h-[300px] flex-col items-center justify-center'>
              <Spinner />
              <p className='text-medium'>Descargando cuenta</p>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  )
}
