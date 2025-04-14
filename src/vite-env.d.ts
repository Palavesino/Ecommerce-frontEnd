/// <reference types="vite/client" />


// Extiende ImportMetaEnv con tus variables
interface ImportMetaEnv {
  readonly VITE_URL_DOMAIN: string;
  // Agrega otras variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}