import { useNavigate } from "react-router-dom";

const OrderFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="order-result-page">
      <div className="order-result-icon failure">✕</div>
      <h2 className="order-result-title">Pago rechazado</h2>
      <p className="order-result-msg">Hubo un problema con tu pago. Podés intentarlo de nuevo.</p>
      <button className="order-result-btn" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};
export default OrderFailure;