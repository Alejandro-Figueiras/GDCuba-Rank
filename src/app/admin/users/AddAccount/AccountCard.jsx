import AccountIconsRow from '@/components/Admin/UserModalPanel/AccountIconsRow'
import AccountStatsRow from '@/components/Admin/UserModalPanel/AccountStatsRow'
import { useGDIcon } from '@/robtop/iconkit/useGDIcon'
import { Card, CardHeader, CardBody, CardFooter, Divider, Checkbox, Button } from '@nextui-org/react'
import { useRef } from 'react'

const AccountCard = ({account}) => {
  const cubanCheck = useRef(true)

  const {icon} = useGDIcon({
    type: 'cube',
    iconNumber: account.accicon,
    c1: account.playercolor,
    c2: account.playercolor2,
    c3: account.playercolor3,
    glow: account.accglow,
    effectDeps: [account]
  })

  const handleSubmit = (e) => {
    console.log(cubanCheck.current)
  }

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardHeader className="flex gap-3">
        <img src={icon} width={40} height={40} />
        <div className="flex flex-col">
          <p className="text-md">{account.username}</p>
          <p className="text-small text-default-500">AccountID: {account.accountid}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="my-2 mx-8">
        <AccountStatsRow user={account}/>
        </div>
        <AccountIconsRow user={account}/>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-end gap-4">
        <Checkbox defaultSelected onValueChange={isSelected => {cubanCheck.current=isSelected}}>Cubano</Checkbox>
        <Button color='primary' onPress={handleSubmit}>Agregar al Rank</Button>
      </CardFooter>
    </Card>
  )
}

export default AccountCard