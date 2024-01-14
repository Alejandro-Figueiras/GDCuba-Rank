'use client'
import { useState, useEffect } from 'react'

const AccountStuffMe = ({account, stuffItems = []}) => {
  // TODO autorizaciones
  console.log(stuffItems)
  const stuffOrder = JSON.parse(account.stufforder).map(item=>item)
  const [stuff, setStuff] = useState([{type: 'bio'},{type: 'bio'},{type: 'bio'}])

  return (<div className="flex flex-col gap-2">
    <p>{account.stufforder}</p>
    {stuff.map((data, i)=>{
      return <p key={i}>{JSON.stringify(data)}</p>
    })}
  </div>)
}

export default AccountStuffMe