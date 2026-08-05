# frontend-chpc

Frontend de la aplicación CHPC construido con Vue.js 3 y desplegado con Docker + Nginx.

> ⚠️ **IMPORTANTE**: Este proyecto usa **Docker Standalone** con Dokploy, NO Docker Swarm.  
> Ver: [DOKPLOY_STANDALONE_CONFIG.md](./DOKPLOY_STANDALONE_CONFIG.md)

---

## 🚀 Desarrollo Local

### Project setup
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

## 🧪 Pruebas unitarias

Ejecutadas con [Vitest](https://vitest.dev), independiente del build de webpack.

```bash
npm test            # una corrida
npm run test:watch  # modo watch durante el desarrollo
npm run test:coverage
```

Los specs viven junto al código que prueban, en carpetas `__tests__/`:

| Suite | Cubre |
|---|---|
| `src/utils/__tests__/validators.spec.js` | Primitivas: cédula ecuatoriana (módulo 10), teléfono, email, nombres |
| `src/utils/__tests__/formValidation.spec.js` | Motor genérico de validación declarativa |
| `src/components/AgendamientoCitas/__tests__/pacienteSchema.spec.js` | Esquema del formulario de agendamiento |

La configuración (alias `@` y patrón de archivos) está en [vitest.config.mjs](./vitest.config.mjs).

## 🐳 Docker

### Construcción de la imagen
```bash
docker build -t chpc-frontend .
```

### Ejecutar contenedor localmente
```bash
docker run -d -p 8080:80 chpc-frontend
```

Acceder en: http://localhost:8080

## 🔍 Diagnóstico de Problemas

Si el contenedor no inicia en el servidor:

### Opción 1: Script de diagnóstico (en el servidor)
```bash
bash diagnostico-frontend.sh
```

### Opción 2: Script de diagnóstico (desde Windows)
```powershell
.\diagnostico-frontend.ps1
```

### Opción 3: Manual
Ver documentación completa en [DIAGNOSTICO_DOCKER.md](./DIAGNOSTICO_DOCKER.md)

## 📝 Variables de Entorno

Para configurar en Dokploy:

```bash
VUE_APP_API_URL=https://chpc-backend-mrdcx4-0db854-45-88-188-111.traefik.me/api
VUE_APP_API_PROXY=false
NODE_ENV=production
```

## 🌐 Despliegue

El proyecto está configurado para desplegarse en Dokploy con:
- **Nginx** como servidor web
- **Docker multi-stage build** para optimización
- **Health checks** automáticos
- **Compresión gzip** habilitada
- **Cache** para assets estáticos

## 📚 Documentación

- [DIAGNOSTICO_DOCKER.md](./DIAGNOSTICO_DOCKER.md) - Solución de problemas con Docker
- [MIGRACION_API_CLIENT.md](./MIGRACION_API_CLIENT.md) - Guía de migración de API

## Uso del Panel Admin sin acceso al backend
Este proyecto incluye un panel de administración local para editar el carrusel de la página de inicio y la sección de noticias, incluso cuando no tienes acceso al backend ni a credenciales de login.

### Qué se modificó
- `src/components/AdminPanel/AdminPanel.js`
  - Ajuste de `visibleTabs()` para que las pestañas de `Carrusel` y `Noticias` también sean visibles para el rol `vendedor`.
  - Modificación de `checkAuth()` para aceptar un modo offline cuando el backend no responde, de modo que no bloquee el acceso al panel local.
  - Se agregó un campo interno `offlineMode` para indicar que la página funciona sin verificación de backend.
- `src/components/AdminPanel/AdminPanel.vue`
  - Actualización de los `v-if` de los paneles `Carrusel` y `Noticias` para que no requieran estrictamente `isAdmin`.
- `src/components/AdminPanel/AdminPanel.css`
  - Incremento del `margin-top` para que el admin panel no quede tapado por el header fijo del sitio.

### Cómo funciona ahora
- Las secciones `Carrusel Inicio` y `Noticias` cargan datos desde el `localStorage` usando `contentStore.js`.
- Puedes crear, editar y eliminar entradas desde el panel.
- Los cambios se guardan en el navegador y no dependen del backend cuando éste está inaccesible.

### Cómo volver a la seguridad anterior
Si luego se recupera el acceso al backend y quieres restaurar el comportamiento original, revierte estos cambios:
- En `src/components/AdminPanel/AdminPanel.js`, devuelve `checkAuth()` a la verificación estricta contra `/auth/verificar`.
- En `src/components/AdminPanel/AdminPanel.js`, restablece `visibleTabs()` para que solo `administrador` vea `Carrusel` y `Noticias`.
- En `src/components/AdminPanel/AdminPanel.vue`, vuelve a usar `isAdmin` en los `v-if` de `Carrusel` y `Noticias`.
- En `src/components/AdminPanel/AdminPanel.css`, ajusta `margin-top` al valor previo si es necesario.

### Nota
Este arreglo es útil cuando trabajas solo con el frontend y no hay backend disponible. Cuando tengas credenciales válidas o backend activo, lo ideal es volver a la lógica original para mantener la seguridad.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
