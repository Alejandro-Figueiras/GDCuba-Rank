# db.users

## addUser

Esta función agrega un usuario a la base de datos y posteriormente lo descarga a la cache local.

### Propiedades
```json
{ 
  user,     // String
  password, // String (hash)
  phone,    // String
  accountID // Number
}
```

### Devuelve
```js
{ 
  id,        // Number
  username,  // String
  accountid, // Number
  phone,     // String
  role,      // String (enum)
  status,    // Char (enum)
  password   // String (hash)
}
```

## getUser

Esta función retorna un usuario directamente de la cache local, nunca toca la base de datos online

### Propiedades
```json
{ 
  user // String
}
```

### Devuelve
```js
{ 
  id,        // Number
  username,  // String
  accountid, // Number
  phone,     // String
  role,      // String (enum)
  status,    // Char (enum)
  password   // String (hash)
}
```

## findUser

Esta función es igual a la función getUser pero no tiene en cuenta las mayúsculas y minúsculas, retorna datos del usuario directamente de la cache local, nunca toca la base de datos online. Utiliza las mismas propiedades y devoluciones.

## getAllUsers

Esta función retorna todos los usuarios directamente de la cache local, nunca toca la base de datos online

### Propiedades

Ninguna por el momento

### Devuelve
```js
[
  { 
    id,        // Number
    username,  // String
    accountid, // Number
    phone,     // String
    role,      // String (enum)
    status,    // Char (enum)
    password   // String (hash)
  },
  ...
]
```