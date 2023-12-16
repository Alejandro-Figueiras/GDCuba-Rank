# Level

Modelo para la respuesta desde el servidor de RobTop a los niveles

Ojo, son para la request de busqueda, no para el Full Level

| Propiedad | Tipo | Descripción | RobTop |
| ---------- | ---- | ----------- | -- |
| gameversion | **Integer** | La Versión de GD donde se subió el. Versions 1.0 to 1.6 use version numbers 1 to 7 respectively. Version 10 is 1.7. Otherwise, divide the version number by ten to get the correct number. | 13 |
| levelid | **Integer** | LevelID | 1  |
| levelname | **String**| Nombre | 2  |
| description | **String** | Descripción, encoded in base64 | 3  |
| version | **Integer** | Versión del Nivel Publicada | 5  |
| playerid  | **Integer** | PlayerID del Autor | 6  |
| `Estadísticas` | ------- | -------- | -- |
| length | **Integer** | Un numero desde 0-4, donde 0 es tiny y 4 es XL | 15 |
| downloads | **Integer** | Las descargas | 10 |
| likes  | **Integer** | likes - dislikes | 14 |
| coins  | **Integer** | El número de user coins del nivel | 37 |
| verifiedcoins| **Bool** | Si las monedas del nivel han sido verificadas (silver coins) | 38 |
| `Dificultad` | ------- | -------- | -- |
| stars  | **Integer** | Estrellas| 18 |
| starsrequested  | **Integer** | La cantidad de estrellas requeridas | 39 |
| difficultydenominator | **Integer** | Retorna 0 si el nivel es N/A, retorna 10 si la dificultad ha sido asignada. Historicamente se usa como la cantidad de personas que han votado en dificultad. | 8 |
| difficultynumerator| **Integer** | El numerador usado para calcular la dificultad del nivel. Dividido por el denominador para obtener el icono de dificultad. Ahora mismo 0 = unrated, 10 = easy, 20 = normal, 30 = hard, 40 = harder, 50 = insane. También puede ser usado para determinar la dificultad demon como un side-effect del sistema de votos. Historicamente se usa como la suma de las estrellas de todos los votos | 9 |
| auto | **Bool** | Si el nivel es auto | 25 |
| demon | **Bool** | Si el nivel es demon | 17 |
| demondifficulty| **Integer** | 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme.| 43 |
| featurescore | **Integer** | 0 si el nivel no es featured, sino un numero positivo. Entre más alto, más alto aparece en featured list | 19 |
| epic | **Integer** | Si el nivel es epic | 42 |
| `Canción` | ------- | -------- | -- |
| officialsong | **Integer** | Si el nivel tiene una canción oficial | 12 |
| customsongid | **Integer** | La ID de la canción en newgrounds | 35 |
| `General` | ------- | -------- | -- |
| twoplayer | **Bool** | Si tiene 2 player | 31 |
| dailynumber  | **Integer** | Daily/weekly levels only. Devuelve cual daily/weekly es (e.j. el daily numero 506). Réstale 100,000 si el nivel es weekly | 41 |
| copiedid  | **Integer** | La ID del nivel copiado (si el nivel es copiado, sino no xd)| 30 |
| objects | **Integer** | La cantidad de objetos del nivel, usado para determinar si el nivel es considerado "large". Esta limitado a 65535 | 45 |