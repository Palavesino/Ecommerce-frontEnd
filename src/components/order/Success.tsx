import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="order-result-page">
      <div className="order-result-icon success">✓</div>
      <h2 className="order-result-title">¡Pago exitoso!</h2>
      <p className="order-result-msg">Tu pedido fue recibido y está siendo procesado.</p>
      <button className="order-result-btn" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};
export default OrderSuccess;