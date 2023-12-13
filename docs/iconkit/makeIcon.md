# makeIcon (Async)

Este server action (`use server`) se usa para renderizar la imagen en formado Base64Url de un icono seleccionado.

## Parámetros

Este objeto recibe los parametros dentro de un objeto

```json
{
  type: String,
  iconNumber: number,
  c1: number,
  c2: number,
  glow: boolean,
  hostUrl: String
}
```

### HostURL

Es la url del sitio donde esta alojado en el servidor, por ejemplo si estamos en `http://localhost:3000/rank/stars` la url necesaria sería `http://localhost:3000` (sin el `/`). Como es un server action, probablemente sea llamado desde el cliente, así que es necesario pasarselo para evitar problemas

Aqui dejo un código para hacerlo sencillamente:

```js
// Desde el cliente
const currentUrl = window.location.href;
const hostURL = currentUrl.split("/").slice(0,3).join("/")

// Desde el servidor (no lo recomiendo)
const hostURL = `http://localhost:${process.env.PORT}`
```

### Type

```json
[ "cube", "ship", "ball", "ufo", "wave", "robot", "spider" ]
```

### Colores

Los colores se representan con un número que corresponde a un json ubicado en `/src/robtop/iconkit/colors.json` y presentan la siguiente estructura

```json
{
  "0" : {"r": 125, "g": 255, "b": 0}, 
  "1" : {"r": 0, "g": 255, "b": 0}, 
  "2" : {"r": 0, "g": 255, "b": 125}, 
  ...
  // Son 41 hasta el momento
}
```
