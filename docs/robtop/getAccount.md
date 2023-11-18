# getAccount

## getAccountByID (async)

Hace una request a los servidores de RobTop usando la id y devuelve un objeto [Account](/models/Account.md) con los datos obtenidos

### Propiedades
- targetAccountID: `number`

### Devuelve
[Account](/models/Account), y si no existe `-1`

## getAccount (async)

Hace una request a los servidores de RobTop usando el username, luego hace otra con la id para obtener los datos completos, y posteriormente devuelve un objeto [Account](/models/Account) con los datos obtenidos

### Propiedades
- target: `String`

### Devuelve
[Account](/models/Account), y si no existe `-1`