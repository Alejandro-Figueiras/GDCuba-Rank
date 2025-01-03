'use client'

import AccountView from '@/components/AccountManage/AccountView'
import { useSesion } from '@/hooks/useSesion'
import { useEffect, useState } from 'react'

const AccountPage = ({ params }: { params: Promise<{ username: string }> }) => {
  const { currentUser } = useSesion()
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    params.then((params) => {
      setUsername(params.username)
    })
  }, [params])

  return (
    <div className='flex justify-center p-4'>
      <AccountView
        manage={currentUser.username == username}
        username={username}
      />
    </div>
  )
}

export default AccountPage
