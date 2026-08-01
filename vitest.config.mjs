import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Configuración de pruebas unitarias.
 *
 * Vitest corre aparte del build de Vue CLI (webpack): solo necesita resolver el
 * alias `@` igual que lo hace la app, para que los tests importen los módulos
 * con las mismas rutas que el código de producción.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // Los módulos bajo prueba son lógica pura: no hace falta jsdom.
    environment: 'node',
    include: ['src/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      include: ['src/utils/**/*.js', 'src/components/**/*Schema.js'],
    },
  },
});
