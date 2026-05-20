import { useNavigate } from "react-router-dom";
import "./Page404.css";

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="page-404">
      <div className="page-404-content">
        <span className="page-404-eyebrow">Error</span>
        <h1 className="page-404-number">404</h1>
        <div className="page-404-divider" />
        <p className="page-404-message">
          La página que buscás no existe o fue movida.
        </p>
        <button className="page-404-btn" onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
};