'use client'
import { getAccountAction, getAccountFromRobTopAction } from '@/actions/accounts/getAccountAction';
import {Input, Button } from '@nextui-org/react'
import { useRef, useState } from 'react'
import AccountCard from '../../accounts/AccountCard';
import { notify, notifyDismiss } from "@/libs/toastNotifications";
import { addNewAccountAction } from '@/actions/admin/addNewAccountAction';

const AddAccount = () => {
  const inputRef = useRef();
  const [account, setAccount] = useState({})
  
  const handleSearch = async(e) => {
    const user = inputRef.current.value;
    const newAccount = JSON.parse(await getAccountFromRobTopAction({username: user}))
    console.log(newAccount)
    setAccount(newAccount)
  }

  const submitAccount = async({account, cuba = false}) => {
    let local = await getAccountAction({username: account.username});
    if (local) {
      local = JSON.parse(local);
      if (local.cuba == 0 && cuba) {
        // TODO Convertir a Cubano
      } else {
        notify('La cuenta ya está en la base de datos', 'info')
      }
    } else {
      await addNewAccountAction({account, cuba: cuba?1:0})
      notify('La cuenta fue agregada exitosamente', 'success')
    }
    setAccount({});
    inputRef.current.value = '';
  }

  return (<>
    <div className="w-100 m-4">
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" label="GD Account Username" className="w-96" ref={inputRef}/>
        <Button onClick={handleSearch}>Buscar Cuenta</Button>
      </div>
      <div className="mt-6 w-100">
        {(account.username) ? (
          <AccountCard account={account} submitAccount={submitAccount}/>
        ):<p className='text-center'>{account == -1 ? "No existe esta cuenta" : 'Vacío.'}</p>}
      </div>
    </div>
  </>)
}

export default AddAccount;