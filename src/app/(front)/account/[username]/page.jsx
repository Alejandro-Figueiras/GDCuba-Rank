"use client"

import AccountView from "@/components/AccountManage/AccountView"
import { useSesion } from "@/hooks/useSesion";

const AccountPage = ({ params }) => {
  const { currentUser } = useSesion();
  
  return (
    <div className="flex justify-center p-4">
      <AccountView manage={currentUser.username == params.username} username={params.username}/>
    </div>
  )
}

export default AccountPage