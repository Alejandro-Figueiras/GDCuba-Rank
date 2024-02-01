"use client"

import AccountView from "@/components/AccountManage/AccountView"

const AccountPage = ({ params }) => {
  
  return (
    <div className="flex flex-col justify-center global-full-height">
      <div className="flex justify-center">
        <AccountView manage={false} username={params.username}/>
      </div>
    </div>
  )
}

export default AccountPage