import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // 1. Cargar variables explícitamente
    var env = loadEnv(mode, process.cwd(), 'VITE_');
    return {
        plugins: [react()],
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
