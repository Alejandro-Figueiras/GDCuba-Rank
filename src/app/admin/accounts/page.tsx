'use client'
import { getAllAccountsAction } from '@/actions/admin/getAllAccountsAction'
import TablaAccounts from '@/components/Admin/Accounts/TablaAccounts'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import AddAccount from '../../../components/Admin/Accounts/AddAccount'
import TablaHeader from '@/components/Admin/TablaHeader'
import { type Account } from '@/models/Account'

const AdminAccountsPage = () => {
  const [accounts, setAccounts] = useState([] as Account[])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const updateAccounts = () => {
    setLoading(true)
    getAllAccountsAction().then((response: string | undefined) => {
      if (!response) return updateAccounts()
      const newData = JSON.parse(response) as Account[]
      newData.sort((a, b) => b.id - a.id)
      console.log(newData)
      setAccounts(newData)
      setLoading(false)
    })
  }

  const agregarCuenta = () => {
    onOpen()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateAccounts, [])
  return (
    <>
      <TablaHeader
        title='Cuentas de Geometry Dash'
        buttons={[
          {
            text: 'Agregar cuenta',
            handleClick: agregarCuenta
          },
          {
            text: 'Refresh',
            handleClick: updateAccounts
          }
        ]}
      >
        <TablaAccounts
          gdaccounts={accounts}
          updateAccounts={updateAccounts}
          loading={loading}
        />
      </TablaHeader>
      <AddAccount isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default AdminAccountsPage
