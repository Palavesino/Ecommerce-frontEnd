import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 1. Cargar variables explícitamente
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: false,
      outDir: "dist",
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