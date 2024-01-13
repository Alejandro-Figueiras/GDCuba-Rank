'use client'
import { useState, useEffect } from 'react'

const AccountStuffMe = ({account}) => {
  // TODO autorizaciones
  const [stuff, setStuff] = useState([{type: 'bio'},{type: 'bio'},{type: 'bio'}])

  return (<div className="flex flex-col gap-2">
    {stuff.map((data, i)=>{
      return <p key={i}>{JSON.stringify(data)}</p>
    })}
  </div>)
}

export default AccountStuffMe