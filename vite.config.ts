import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANTE: se ha eliminado el bloque `define` que incrustaba GEMINI_API_KEY
// en el JavaScript del navegador. La clave ahora vive SOLO en el servidor,
// dentro de api/secrets.php. Nunca vuelvas a añadirla aquí.

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    // En desarrollo local, redirige /api al PHP o a donde lo tengas levantado.
    // Si no desarrollas la parte PHP en local, puedes borrar este bloque.
    proxy: {
      '/api': {
        target: 'https://tracker.congresodeportesraqueta.es',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    // Sin sourcemaps en producción: no expongas el código fuente.
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
