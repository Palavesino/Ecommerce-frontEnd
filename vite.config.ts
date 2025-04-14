import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 1. Cargar variables explícitamente
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  // 2. Debug (verifica en terminal al ejecutar npm run dev)
  console.log('✅ URL del API:', env.VITE_URL_DOMAIN);

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_URL_DOMAIN, // Usa la variable aquí
          changeOrigin: true,
          secure: false,
        }
      }
    },
    plugins: [react()],
    build: {
      sourcemap: false,
    },
    esbuild: {
      sourcemap: false,
    },
    optimizeDeps: {
      esbuildOptions: {
        sourcemap: false,
      },
    },
  };
});