# Account

Modelo para la respuesta desde el servidor de RobTop a los perfiles del usuario

| Propiedad | Tipo | Descripción | RobTop |
| ---------- | ---- | ----------- | -- |
| username | **String** | El username del jugador | 1  |
| userid | **Integer** | RobTop PlayerID | 2  |
| accountid | **Integer** | RobTop AccountID | 16 |
| isregistered | **Integer** | Pues un boolean pero entero xd | 29 |
| `Estadísticas` | ------- | -------- | -- |
| stars | **Integer** | Las estrellas del jugador | 3  |
| demons | **Integer** | Número de demons completados por el jugador | 4  |
| secretcoins | **Integer** | Secret Coins | 13 |
| usercoins | **Integer** | Levels User Coins | 17 |
| globalrank | **Integer** | El Global Rank del jugador | 30 |
| diamonds | **Integer** | Inútil por ahora xdddd | 46 |
| creatorpoints | **Integer** | El número de CP que el jugador tenga | 8  |
| modlevel | **Integer** | `0: None` `1: Normal Mod(yellow)` `2: Elder Mod(orange)` | 49 |
| `Iconos` | ------- | -------- | -- |
| playercolor | **Integer** | First color | 10 |
| playercolor2 | **Integer** | Second color | 11 |
| accicon | **Integer** | Cubo | 21 |
| accship | **Integer** | Nave | 22 |
| accball | **Integer** | Bola | 23 |
| accbird | **Integer** | UFO | 24 |
| accwave | **Integer** | Wave | 25 |
| accrobot | **Integer** | Robot | 26 |
| accglow | **Integer** | Glow Number | 28 |
| accspider | **Integer** | Araña | 43 |
| accexplosion | **Integer** | Explosión | 48 |
| `Social en GD` | ------- | -------- | -- |
| friendsrqstate | **Integer** | `0: Todos` `1: Nadie` | 19 |
| messagestate | **Integer** | `0: Todos` `1: Solo los amigos` `2: Nadie` | 18 |
| friendstate | **Integer** | `0: No lo es` `1: Ya es un amigo` `3: Request Enviada, pero no la ha aceptado`, `4: Te envió una request, pero no la has aceptado` | 31 |
| commenthistorystate | **Integer** | `0: Todos`, `1: Solo Amigos` `2: Nadie` | 50 |
| `Social Media` | ------- | -------- | -- |
| youtube | **String** | youtube url | 20 |
| twitter| **String** | @Twitter | 44 |
| twitch | **String** | twitch.tv url | 45 |
| `Backend` | ------- | -------- | -- |
| timestamp | **Long Integer** | El timestamp que indica la edad de la información | -- |