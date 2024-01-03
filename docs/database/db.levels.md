# db.levels

Levels no trabaja con la base de datos PostgreSQL, sino que lo hace en Vercel KV, una base de datos basada en Redis, donde se guardan los niveles utilizando la estructura key-value, con las key `level:{id}`

## getLevel (async)

Consulta si el nivel está en KV, sino lo busca en el servidor de robtop y luego de encontrado lo devuelve.

### Propiedades

```json
{ levelID: Number }
```

### Devuelve 

Un objeto Level con el resultado

## setLevel (async)

Agrega o actualiza un nivel en KV

### Propiedades
```json
{ level: Level }
```

### Devuelve

El propio objeto level

## removeLevel (async)

Comprueba si existe el nivel en el KV, posteriormente lo elimina.

### Propiedades

```json
{ levelid: Number }
```

## getAllLevelKeys (async)
Retorna todas las Keys de niveles guardados en el KV

### Devuelve
Un array de Keys (strings) de la forma 'level:{LevelID}'