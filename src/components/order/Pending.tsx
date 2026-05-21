import { useNavigate } from "react-router-dom";

const OrderPending = () => {
  const navigate = useNavigate();
  return (
    <div className="order-result-page">
      <div className="order-result-icon pending">⏳</div>
      <h2 className="order-result-title">Pago pendiente</h2>
      <p className="order-result-msg">Tu pago está siendo procesado. Te avisaremos cuando se confirme.</p>
      <button className="order-result-btn" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};
export default OrderPending;