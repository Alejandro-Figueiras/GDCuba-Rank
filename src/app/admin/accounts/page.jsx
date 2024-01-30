'use client'
import { getAllAccountsAction } from "@/actions/admin/getAllAccountsAction";
import TablaAccounts from "@/components/Admin/Accounts/TablaAccounts";
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

export default () => {
  const [accounts, setAccounts] = useState([]);

  const updateAccounts = () => {
    getAllAccountsAction().then(response => {
      const newData = JSON.parse(response)
      newData.sort((a,b)=>b.id-a.id)
      console.log(newData)
      setAccounts(newData)
    })
  }
  
  useEffect(updateAccounts, [])
  return (
    <div className="component px-8 py-4">
      <div className="flex justify-between">
        <h2 className="pt-4 pb-2 text-2xl">Cuentas de Geometry Dash</h2>
        <div className="flex">
          <Button onClick={updateAccounts}>
            Refresh
          </Button>
        </div>
      </div>
      <TablaAccounts gdaccounts={accounts} updateAccounts={updateAccounts} />
    </div>
  );
};
