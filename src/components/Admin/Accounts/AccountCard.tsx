import AccountIconsRow from '@/components/Admin/UserModalPanel/AccountIconsRow'
import AccountStatsRow from '@/components/Admin/UserModalPanel/AccountStatsRow'
import { type Account } from '@/models/Account'
import { useGDIcon } from '@/robtop/iconkit/useGDIcon'
import { Card, Separator, Checkbox, Button } from '@heroui/react'
import { useState } from 'react'

const AccountCard = ({
  account,
  submitAccount
}: {
  account: Account
  submitAccount: (props: { account: Account; cuba: boolean }) => void
}) => {
  const [cubanCheck, setCubanCheck] = useState(true)

  const { icon } = useGDIcon({
    type: 'cube',
    iconNumber: account.accicon,
    c1: account.playercolor,
    c2: account.playercolor2,
    c3: account.playercolor3,
    glow: account.accglow
  })

  const handleSubmit = () => {
    submitAccount({
      account,
      cuba: cubanCheck
    })
  }

  return (
    <Card className='mx-auto max-w-200' variant='secondary'>
      <Card.Header className='flex flex-row gap-3'>
        <img src={icon} width={40} height={40} alt='' />
        <div className='flex w-full flex-row items-center justify-between'>
          <p className='text-foreground text-xl font-semibold'>
            {account.username}
          </p>
          <p className='text-small text-default-500'>
            AccountID: {account.accountid}
          </p>
        </div>
      </Card.Header>
      <Separator />
      <Card.Content>
        <div className='mx-8 my-2'>
          <AccountStatsRow user={account} />
        </div>
        <AccountIconsRow user={account} />
      </Card.Content>
      <Separator />
      <Card.Footer className='flex justify-end gap-4'>
        <Checkbox isSelected={cubanCheck} onChange={setCubanCheck}>
          <Checkbox.Content>
            <Checkbox.Control className='size-5'>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Cubano
          </Checkbox.Content>
        </Checkbox>
        <Button onPress={handleSubmit}>Agregar al Rank</Button>
      </Card.Footer>
    </Card>
  )
}

export default AccountCard
