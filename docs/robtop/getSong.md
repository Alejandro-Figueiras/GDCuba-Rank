# getSong (async)

Hace una request a los servidores de RobTop y con el body construye un objecto Song

Si la canción no existe, o por alguna razón ocurre un error, devuelve -1

Endpoint: getGJSongInfo.php

### Propiedades
- songID: `number`

### Devuelve
[Song](/models/Song), y si no existe `-1`