# Account

Modelo para la respuesta desde el servidor de RobTop a los perfiles del usuario

| Propiedad | Tipo | Descripción | RobTop |
| ---------- | ---- | ----------- | -- |
| username | **String** | El username del jugador | 1  |
| userID | **Integer** | RobTop PlayerID | 2  |
| accountID | **Integer** | RobTop AccountID | 16 |
| isRegistered | **Integer** | Pues un boolean pero entero xd | 29 |
| `Estadísticas` | ------- | -------- | -- |
| stars | **Integer** | Las estrellas del jugador | 3  |
| demons | **Integer** | Número de demons completados por el jugador | 4  |
| secretCoins | **Integer** | Secret Coins | 13 |
| userCoins | **Integer** | Levels User Coins | 17 |
| globalRank | **Integer** | El Global Rank del jugador | 30 |
| diamonds | **Integer** | Inútil por ahora xdddd | 46 |
| creatorpoints | **Integer** | El número de CP que el jugador tenga | 8  |
| modlevel | **Integer** | `0: None` `1: Normal Mod(yellow)` `2: Elder Mod(orange)` | 49 |
| `Iconos` | ------- | -------- | -- |
| playerColor | **Integer** | First color | 10 |
| playerColor2 | **Integer** | Second color | 11 |
| accIcon | **Integer** | Cubo | 21 |
| accShip | **Integer** | Nave | 22 |
| accBall | **Integer** | Bola | 23 |
| accBird | **Integer** | UFO | 24 |
| accWave | **Integer** | Wave | 25 |
| accRobot | **Integer** | Robot | 26 |
| accGlow | **Integer** | Glow Number | 28 |
| accSpider | **Integer** | Araña | 43 |
| accExplosion | **Integer** | Explosión | 48 |
| `Social en GD` | ------- | -------- | -- |
| friendsRqState | **Integer** | `0: Todos` `1: Nadie` | 19 |
| messageState | **Integer** | `0: Todos` `1: Solo los amigos` `2: Nadie` | 18 |
| friendstate | **Integer** | `0: No lo es` `1: Ya es un amigo` `3: Request Enviada, pero no la ha aceptado`, `4: Te envió una request, pero no la has aceptado` | 31 |
| commentHistoryState | **Integer** | `0: Todos`, `1: Solo Amigos` `2: Nadie` | 50 |
| `Social Media` | ------- | -------- | -- |
| youTube | **String** | youtube url | 20 |
| twitter| **String** | @Twitter | 44 |
| twitch | **String** | twitch.tv url | 45 |
| `Backend` | ------- | -------- | -- |
| TimeStamp | **Long Integer** | El timestamp que indica la edad de la información | -- |