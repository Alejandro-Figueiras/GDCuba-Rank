'use client'
import {
  Button
} from '@nextui-org/react'
const RecordsLinkButton = ({username, mini = false}) => {
  const full = <Button className="hidden sm:flex" href={`/account/${username}/records`}>
    <img src="/assets/ui/success.png" alt="" width={24}/>
    Records
  </Button>

  return mini?(<a href={`/account/${username}/records`}>
    <Button isIconOnly={true} className="sm:hidden">
      <img src="/assets/ui/success.png" alt="" width={30}/>
    </Button>
    {full}
  </a>):full
}

export default RecordsLinkButton;