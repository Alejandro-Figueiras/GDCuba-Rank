import {Card, CardHeader} from '@nextui-org/react'

const AccountInfoColumn = ({user}) => {
  return (<div>
    <Card classNames={{base: "mb-2"}}>
      <CardHeader className="text-small justify-between">
        <b>ID</b>
        <p>{user.accountid}</p>
      </CardHeader>
    </Card>

    <Card classNames={{base: "mb-2"}}>
      <CardHeader className="text-small justify-between">
        <b>Teléfono</b>
        <p>{user.phone}</p>
      </CardHeader>
    </Card>
  </div>)
}

export default AccountInfoColumn;