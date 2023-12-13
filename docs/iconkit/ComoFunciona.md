# Cómo funciona makeIcon? (async)

## Pasos que sigue
1. Obtiene los sprites desde la función getIconSprites.
2. Los ordena según el orden de prioridad para imprimir.
3. Luego los pasa por la función `makeSprites` que los colorea, los rota si es necesario, y calcula sus posciones finales a partir del centro del lienzo, luego de renderizar todas las capas, se agregan al array `spritesToPrint`
4. Finalmente se pasan a la función `printSprites` que a partir del array de sprites genera la imagen final.

## Función makeSprites (async)

1. Obtiene el color a aplicar, o si el sprite corresponde al glow, determina si es necesario aplicarlo o no.
2. Le pasa los datos a la función `getLayer`, la cual hace las manipulaciones necesarias a la imagen y devuelve un objeto Jimp Image con la imagen final.
3. Agrega un objeto al array spritesToPrint con la siguiente estructura

```js
{
  layer: Jimp Image,
  path: String, // Nombre del archivo, se utiliza para hacer la busqueda en el objeto gameSheet
  x: Number, // Posición para imprimir desde el origen de coordenadas 
  y: Number,
  w: Number, // Width del sprite manipulado
  h: Number, // Height del sprite manipulado
  offsetX, // Offsets de las partes del robot y la araña
  offsetY  // Ya estan incluidos en x, e y, solo se utilizan para el calculo de las dimensiones de la imagen final
}
```

## Función getLayer (async)

Esta función es la que realiza las manipulaciones del objeto. Recibe un objeto con la siguiente estructura y devuelve la Jimp Image final

```js
// Recibe
{
  url: String,
  path: String,
  color: Object,
  rotate: Number,
  scale: [Number, Number], // default: [1,1]
}
```

1. Lee la imagen desde la URL
2. Rota la imagen segun sus metadatos en `gameSheet`
3. Reescala la imagen a la escala, si es [1,1] queda igual
4. Rota la imagen si es necesario
5. Tinta la imagen con el color si es necesario
6. Retorna el Jimp Object final

## Función printSprites (async)

Recibe el por parametros array `spritesToPrint` mencionado anteriormente y devuelve la imagen resultante final en formado Base64URL, esta se puede poner directamente en el campo `src` de una etiqueta `img`

1. Calcula el width y el height final de la imagen partiendo desde el origen de coordenadas, como WS y WI (width superior e inferior) y, HS y HI (height superior e inferior).
2. Crea la imagen lienzo a partir de los calculos.
3. Dibuja cada sprite en el lienzo utilizando el metodo `.composite()` y el modo `Jimp.BLEND_SOURCE_OVER`
4. Exporta la imagen al formato Base64URL y lo devuelve