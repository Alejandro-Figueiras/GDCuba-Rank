# Como funciona la base de datos?

## Cache Local

En el objeto `global` se guarda un objeto `cache` que contiene la siguiente estructura

```json
{
  users: {}
}
```

## PostgreSQL Online 

Utiliza una base de datos PostgreSQL con los datos en variables de entorno

```env
DATABASE_NAME = ***
DATABASE_HOST = ***
DATABASE_PORT = ***
DATABASE_USER = ***
DATABASE_PASSWORD = ***
```

## Funcionamiento base

Al iniciar la aplicación, en la primera request que se realice al frontend, si no existe el objeto `global.cache` se ejecutará la función `dbInit`. Dicha función descargará toda la información de la base de datos online y la almacenará en la caché local, no se harán más consultas a la base de datos online a no ser que sea necesario realizar algún cambio, que se actualizarán en ambos lugares simultaneamente.

## Función dbInit
1. Crea el objeto local
2. Descarga todos los usuarios de la base de datos online y los ordena en `global.cache.users`
3. Comming Soon...