'use client'
import {
  Button
} from '@nextui-org/react'

const RecordsLinkButton = ({username, mini = false}) => {
  return (<a href={`/account/${username}/records`}>
    <Button isIconOnly={true} className={mini?"sm:hidden":'hidden'}>
      <img src="/assets/ui/success.png" alt="" width={30}/>
    </Button>
    <Button className={mini?"hidden sm:flex":''} href={`/account/${username}/records`}>
      <img src="/assets/ui/success.png" alt="" width={24}/>
      Records
    </Button>
  </a>)
}

export default RecordsLinkButton;