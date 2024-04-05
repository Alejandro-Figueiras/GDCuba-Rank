# db.users

## addUser (async)

Esta función agrega un usuario a la base de datos. Los parametros faltantes se ponen por default en la base de datos.

### Propiedades
```json
{ 
  user,     // String
  password, // String (hash)
  phone,    // String
  accountid // Number
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

## getUser (async)

Esta función retorna un usuario directamente de la base de datos online

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

## findUser (async)

Esta función es igual a la función getUser pero no tiene en cuenta las mayusculas y minusculas, retorna datos del usuario directamente de la base de datos online. Utiliza las mismas propiedades y devoluciones.

## getAllUsers (async)

Esta función retorna todos los usuarios directamente de la base de datos online. Puede ser muy lenta asi que evitar su uso repetitivo

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

## validateUser (async)

Esta función verifica el usuario dentro del sitio. Cambia el status de 'u' a 'v'. También puede actuar de invalidador cuando se le pasa el parametro `unvalidate: true`

### Propiedades

```json
{ 
  user, // String
  unvalidate? // Boolean
}
```

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

O lanza un error si no fue posible actualizar el estado del usuario

## eliminarUser (async)

Elimina el usuario de la base de datos sin dejar rastro de él.

```json
{ 
  username // String
}
```

### Devuelve
`1` si se eliminó exitosamente  
`0` si no encontró resultados  
`undefined` si no tiene permisos