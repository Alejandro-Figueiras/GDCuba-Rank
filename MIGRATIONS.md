# Migraciones

## 2026-07-11 - Actualizacion de dependencias

### Alcance de esta iteracion

En esta iteracion solo se actualizaron dependencias del proyecto. No se modificaron imports, componentes, configuracion de Tailwind, codigo de Next.js, Server Actions, estilos ni logica de aplicacion.

El objetivo fue dejar `package.json` apuntando a las versiones `latest` resueltas por npm al 2026-07-11 y sustituir NextUI por HeroUI a nivel de dependencias.

### Cambios principales

- `next`: `15` -> `^16.2.10`
- `react`: `^18.2.0` -> `^19.2.7`
- `react-dom`: `^18.2.0` -> `^19.2.7`
- `@nextui-org/react`: eliminado
- `@heroui/react`: agregado en `^3.2.2`
- `tailwindcss`: `^3.4.1` -> `^4.3.2`
- `eslint-config-next`: `^15.0.1` -> `^16.2.10`
- `@types/react`: `^18` -> `^19.2.17`
- `@types/react-dom`: `^18` -> `^19.2.3`

### Dependencias runtime actualizadas

- `@heroui/react`: `^3.2.2`
- `@vercel/kv`: `^3.0.0`
- `@vercel/postgres`: `^0.10.0`
- `autoprefixer`: `^10.5.2`
- `axios`: `^1.18.1`
- `bcryptjs`: `^3.0.3`
- `cookie`: `^2.0.1`
- `dotenv`: `^17.4.2`
- `framer-motion`: `^12.42.2`
- `jose`: `^6.2.3`
- `jsonwebtoken`: `^9.0.3`
- `next`: `^16.2.10`
- `pixi.js`: `^8.19.0`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-toastify`: `^11.1.0`

### Dependencias de desarrollo actualizadas

- `@types/bcryptjs`: `^3.0.0`
- `@types/jsonwebtoken`: `^9.0.10`
- `@types/node`: `^26.1.1`
- `@types/react`: `^19.2.17`
- `@types/react-dom`: `^19.2.3`
- `eslint`: `^10.7.0`
- `eslint-config-next`: `^16.2.10`
- `eslint-config-prettier`: `^10.1.8`
- `husky`: `^9.1.7`
- `lint-staged`: `^17.0.8`
- `postcss`: `^8.5.17`
- `prettier`: `^3.9.5`
- `prettier-plugin-tailwindcss`: `^0.8.0`
- `tailwindcss`: `^4.3.2`
- `typescript`: `^7.0.2`

`docsify-cli` se mantuvo en `^4.4.4` porque npm no resolvio una version superior durante la actualizacion.

### Notas importantes de compatibilidad

- HeroUI reemplaza a NextUI, pero el codigo todavia importa desde `@nextui-org/react`. La proxima iteracion debe migrar imports, providers, plugin de Tailwind y cualquier API que haya cambiado.
- `@heroui/react@3.2.2` requiere Tailwind `>=4.0.0`, por eso se actualizo `tailwindcss` a `^4.3.2`.
- Tailwind 4 puede requerir cambios de configuracion y/o PostCSS. En esta iteracion no se ajustaron `tailwind.config.ts`, `postcss.config.js` ni estilos globales.
- NPM mostro advertencias de peer dependencies con `eslint@10.7.0` y paquetes usados internamente por `eslint-config-next@16.2.10`, que todavia declaran compatibilidad hasta ESLint 9 en algunos plugins.
- NPM mostro advertencias de peer dependencies con `typescript@7.0.2` y paquetes de `typescript-eslint` usados por `eslint-config-next@16.2.10`, que declaran soporte para TypeScript `<6.1.0`.
- `lint-staged@17.0.8` declara engine `node >=22.22.1`. El entorno usado durante esta actualizacion tenia Node `v22.14.0`, por lo que conviene actualizar Node antes de validar hooks.

### Pendiente para la migracion de codigo

- Cambiar imports de `@nextui-org/react` a `@heroui/react`.
- Revisar `Providers.tsx` y confirmar el provider recomendado por HeroUI.
- Actualizar `tailwind.config.ts` para HeroUI/Tailwind 4.
- Revisar `postcss.config.js` segun los requisitos de Tailwind 4.
- Ejecutar instalacion completa de dependencias y luego validar con `npm run build`, `npm run format` y la comprobacion de lint que corresponda al nuevo Next.

### Estado del lockfile

`package-lock.json` existe localmente, pero esta ignorado por Git mediante `.gitignore`. La resolucion local de npm se ejecuto con `--package-lock-only`, pero el cambio versionable de esta iteracion queda en `package.json` y este documento.
