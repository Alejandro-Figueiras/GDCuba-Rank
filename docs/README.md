# GD Cuba Rank Site

## Quick Start

### Instalación de Paquetes

```bash
npm install
```

O si utilizas **yarn**

```bash
yarn install
```

### Variables de Entorno

```env
PORT = ***
JWT_SECRET = ***

# Database Info
DATABASE_NAME = ***
DATABASE_HOST = ***
DATABASE_PORT = ***
DATABASE_USER = ***
DATABASE_PASSWORD = ***
```

Si el servidor de RobTop bloquea las peticiones desde el backend, usar un proxy a través de:

```
ROBTOP_PROXY = 1
ROBTOP_PROXY_PROTOCOL = ***
ROBTOP_PROXY_HOST = ***
ROBTOP_PROXY_PORT = ***
```

### Compilar proyecto de NextJS

```bash
yarn run build
```

### Ejecutar

```bash
yarn start
```