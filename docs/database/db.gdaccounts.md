# db.gdaccounts

## addGDAccount (async)

Agrega una cuenta de GD a la base de datos, y especifica si es cubano o no.

### Propiedades

```js
{
  account, // Objeto Account obtenido desde los servidores de robtop
  cuba // 0 o 1
}
```

### Devuelve

El objeto account pasado por parámetros

## getAllGDAccounts (async)

Retorna todas las cuentas de GD que hay en la base de datos

### Devuelve
Un array de Accounts

## getAllCubans (async)

Retorna todas las cuentas de cubanos en la base de datos

### Devuelve
Un array de Accounts

## updateAccounts (async)

Primero consulta si se puede actualizar por el limite de tiempo. Si no es posible, retorna vacío, si lo es:
1. Actualiza el timestamp
2. Consulta los datos de cuentas más antiguos
3. Consulta cada una de esas cuentas y las actualiza en la base de datos
4. Vuelve a actualizar el timestamp

### Propiedades

```js
{
  limit: 3,
  timeLimit: 60000
}
```

## updateAccountStuff (async)

Actualiza los datos del stuff de una cuenta, tenga en cuenta que no hace una validación, dicha debe hacerse antes de llamar a esta función

### Propiedades

```js
{
  accountid: Number, 
  stuff: String
}
```