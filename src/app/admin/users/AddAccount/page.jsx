'use client'
import { getAccountFromRobTopAction } from '@/actions/admin/getAccountAction';
import AccountIconsRow from '@/components/Admin/UserModalPanel/AccountIconsRow';
import AccountStatsRow from '@/components/Admin/UserModalPanel/AccountStatsRow';
import {Input, Button, Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react'
import { useRef, useState } from 'react'
import AccountCard from './AccountCard';

const AddAccount = () => {
  const inputRef = useRef();
  const [account, setAccount] = useState({})
  
  const handleSearch = async(e) => {
    const user = inputRef.current.value;
    const newAccount = JSON.parse(await getAccountFromRobTopAction({username: user}))
    setAccount(newAccount)
  }

  return (<>
    <div className="w-100 m-4">
      <div className="flex flex-row align-middle justify-center gap-4">
        <Input type="text" label="GD Account Username" className="w-96" ref={inputRef}/>
        <Button onClick={handleSearch}>Buscar Cuenta</Button>
      </div>
      <div className="mt-6 w-100">
        {(account.username) ? (
          <AccountCard account={account} />
        ):<p className='text-center'>{account == -1 ? "No existe esta cuenta" : 'Vacío.'}</p>}
      </div>
    </div>
  </>)
}

export default AddAccount;