# getLevel

## Formato de la Respuesta

Las respuesta tienen de formato de objeto de la siguiente manera

```json
{
  levels: [Level, Level, Level, ...]
  authors: [
    {
      playerID: Integer
      playerName: String
      accountid: Integer
    },
    ...
  ],
  songs: [Song, Song, Song, ...]
}
```

En caso de ser a través de `getLevelByID`, las respuestas serán en datos simples

```json
{
  level: Level,
  author: {} | -1
  song: Song | -1
}
```

Si no hay resultados, devuelve `-1`

## getLevelByID (async)

Hace una request a los servidores de robtop buscando por la id, coge el primer (y único) nivel que sale, y hace el objeto result

**IMPORTANTE**: Si no tienes el LevelID, usa la función `getLevels`

### Propiedades
- id: `number`

### Devuelve
- Objeto anterior

## getLevels (async)

Hace una request a los servidores de robtop buscando la query, y devuelve un objeto con los resultados obtenidos

### Propiedades
- query: `String`

### Devuelve
- Objeto Anterior