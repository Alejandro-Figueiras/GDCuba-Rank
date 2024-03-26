'use client'
import { getAllAccountsAction } from "@/actions/admin/getAllAccountsAction";
import TablaAccounts from "@/components/Admin/Accounts/TablaAccounts";
import { useEffect, useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import AddAccount from "../../../components/Admin/Accounts/AddAccount";
import TablaHeader from "@/components/Admin/TablaHeader";

export default () => {
  const [accounts, setAccounts] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const updateAccounts = () => {
    getAllAccountsAction().then(response => {
      const newData = JSON.parse(response)
      newData.sort((a,b)=>b.id-a.id)
      console.log(newData)
      setAccounts(newData)
    })
  }

  const agregarCuenta = () => {
    console.log("Cuenta");
    onOpen()
  }
  
  useEffect(updateAccounts, [])
  return (
    <>
      <TablaHeader title="Cuentas de Geometry Dash" buttons={[
        {
          text: "Agregar cuenta",
          handleClick: agregarCuenta
        }, 
        {
          text: "Refresh",
          handleClick: updateAccounts
        }
      ]}>
        <TablaAccounts gdaccounts={accounts} updateAccounts={updateAccounts} />
      </TablaHeader>
      <AddAccount
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        />
    </>
  );
};
