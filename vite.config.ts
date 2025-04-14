import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 1. Cargar variables explícitamente
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  

  return {
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