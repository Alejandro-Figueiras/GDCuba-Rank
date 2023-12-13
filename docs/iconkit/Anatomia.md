# Anatomía del ícono

## Tipos de ícono
| Tipo | FileType |
| ---- | -------- |
|cube| player |
|ufo| bird |
|wave| dart |
|robot| robot |
|spider| spider |
|ship| ship |
|ball| player_ball |

## Nombre de los archivos

`type_iconNumber_layer?_001.png` Para todos excepto el robot y la araña, estos últimos se dividen por partes y los archivos se nombran `type_iconNumber_partNumber_layer?_001.png`

## Capas del ícono

Capas del icono ordenadas por el z-index de más distante a más cercana

| Capa | Descripción |
| :--: | ----------- |
| glow | La capa de glow del ícono |
| 3    | La capsula del ufo, no se le aplica color |
| 2    | Se le aplica el color 2 |
| Nada | Se le aplica el color 1, si utilizas el método split sobre el nombre del archivo, la puedes identificar con un else descartando las anteriores, o comparandola con '001.png' |
| extra | No se le aplica color, es la capa superior del ícono|

## Información de cada capa

Se encuentran en el archivo `gameSheet.json` y tienen la siguiente estructura

```js
{
  "bird_01_001.png": {
    "spriteOffset": [0, 0],
    "spriteSize": [147, 62],
    "spriteSourceSize": [147, 62],
    "textureRotated": false
  },
  ...
}
```

- **spriteSize** es el tamaño de la capa  
- **spriteOffset** es el offset de la capa desde el centro del lienzo, partiendo del origen `[0,0]`  
- **spriteSourceSize** todavía no le encuentro utilidad XD  
- **textureRotated** si es true, antes de operar con el array debemos girarlo 90 grados en sentido de las manecillas del reloj

## Sobre el Robot y la Araña

Estos dos son diferentes a los demás. Sus sprites están divididos por partes para facilitar las animaciones, los anteriores solo se rotaban, estos mueven sus piernas, y tienen animaciones tanto para correr, como para saltar.  
Entonces para solucionar este problema, se dibujaremos ambos iconos utilizando la animación `idle`, contenida en los archivos `robotInfo.json` y `spiderInfo.json`, ambos cuentan con la sigueinte estructura
```js
[
  {
    "part": 3,
    "pos": [-7.175, -6.875],
    "scale": [0.9969, 0.9984],
    "rotation": -29.6729, // en Jimp se debe multiplicar por -1 este valor
    "flipped": [false, false], // hasta ahora siempre ha sido false
    "z": 0
  },
  ...
]
```
Se debe respetar el orden de estas a la hora de renderizar, incluso si es necesario, usar la propiedad `z` para el manejo de capas, solo que en el json ya vienen en orden, asi que con iterar sobre el array ya valdría.

> **Nota:** Se debe multiplicar por 4 la posición ya que viene adaptada a los valores de calidad gráfica baja del juego, y como los sprites son de los archivos UHD, es necesario hacer la multiplicación

## Implementación sencilla

Para esto, utilice la función [makeIcon](/iconkit/makeIcon)