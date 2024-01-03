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

> Las variables de PostgreSQL y KV (Redis) están hechas principalmente para su uso en Vercel

```env
PORT = ***
JWT_SECRET = ***

### Database Info
POSTGRES_URL=***
POSTGRES_PRISMA_URL=***
POSTGRES_URL_NON_POOLING=***
POSTGRES_HOST=***
POSTGRES_USER=***
POSTGRES_PASSWORD=***
POSTGRES_DATABASE=***

### Vercel KV
KV_URL=***
KV_REST_API_URL=***
KV_REST_API_TOKEN=***
KV_REST_API_READ_ONLY_TOKEN=***
```

### Compilar proyecto de NextJS

```bash
yarn run build
```

### Ejecutar

```bash
yarn start
```

---

> Para ese proyecto se usó documentación de [gd.docs](https://github.com/gd-programming/gd.docs)