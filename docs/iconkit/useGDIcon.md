# useGDIcon

Para la optimización a la hora de renderizar los iconos he creado un custom hook que además de obtener la `hostURL` y renderizar los íconos, los guarda en el localStorage con la nomenclatura `type_iconNumber_color1_color2_glow` para evitar un renderizado doble. Es la forma optima que debemos utilizar a la hora de renderizar el icono.

Como lo que retorna la función `makeIcon` es una imagen que se debe poner en el atributo `src` de una etiqueta `img` se crearon dos custom hooks de funcionamiento similar, uno que alberga la imagen en un `state` (useGDIcon) y otro que la alberga en una `ref` (useGDIconRef)

## Cuál usamos en cada caso?

En caso de que sea un componente de NextUI o local que requiera que se le pase el src por una prop, utilizamos el que retorna un state (`useGDIcon`), ya que este nos obligará a renderizar otra vez el componente una vez obtenida la imagen.  
En caso de que utilicemos una etiqueta `img` a la hora de cambiar el atributo `src` mediante la ref, el componente no se volverá a renderizar completamente, pero el navegador volverá a cargar la nueva imagen.

## Parámetros

Se le debe pasar un objeto como parametros con las siguientes propiedades:

```js
{
  type: String,
  iconNumber: number,
  c1: number,
  c2: number,
  glow: boolean,
}
```

Pero opcionalmente, si no contamos con los datos del usuario, pero si con el `username`, podemos utilizar este otro objeto como parametro. Este método hará otra request y verificará los datos del usuario desde el servidor, si es posible se debe evitar su uso cuando ya contamos anteriormente con los datos del usuario, en dicho caso se debe hacer de la manera anterior.

```js
{
  type: String,
  username: String,
}
```

## Retorno

Ambos hooks retornarán un objeto con la propiedad `icon`.

* En el caso de `useGDIcon` será un state
* En el caso de `useGDIconRef` será una ref que se le debe pasar a la etiqueda `img` de la siguiente manera

```jsx
<img ref={icon} alt="RobTop Icon">
```

## Funcionalidad

1. Crea el state o la ref correspondiente
2. Crea un useEffect con una función que se tratará más adelante
3. Devuelve el state o la ref

### En el useEffect

1. Consulta y obtiene la url mediante el código visto anteriormente en la documentación de la función `makeIcon`
2. Si se especificó el username, se buscará en la base de datos, y se obtendrán sus datos.
3. Se comprueban los limites de la 2.1, para evitar iconos en blanco
4. Se comprueba si el icono esta en el local storage, si no lo está se llama la función makeIcon y el resultado se guarda en el local storage
5. Una vez obtenida la imagen se guardará en el state o ref correspondiente
