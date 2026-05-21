// Importaciones de dependencias
import ReactDOM from "react-dom/client";
// Importaciones de componentes, funciones y modelos
import App from "./App.tsx";

// Importaciones de estilos
import "./index.css";
import { initMercadoPago } from "@mercadopago/sdk-react";

const TOKEN = import.meta.env.VITE_MP_PUBLIC_KEY;
initMercadoPago(TOKEN, { locale: "es-AR" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
  </>
);