'use client'
import { Button } from '@heroui/react'

const RecordsLinkButton = ({
  username,
  mini = false
}: {
  username: string
  mini?: boolean
}) => {
  return (
    <a href={`/account/${username}/records`}>
      <Button
        isIconOnly
        className={mini ? 'min-w-8! px-0! sm:hidden' : 'hidden'}
        variant='tertiary'
      >
        <img src='/assets/ui/success.png' alt='' width={30} height={30} />
      </Button>
      <Button
        className={mini ? 'hidden sm:flex' : ''}
        variant='tertiary'
        // href={`/account/${username}/records`}
      >
        <img src='/assets/ui/success.png' alt='' width={24} />
        Records
      </Button>
    </a>
  )
}

export default RecordsLinkButton
