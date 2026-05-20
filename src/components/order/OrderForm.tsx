import React, { useState } from "react";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { BsCheckCircle } from "react-icons/bs";
import "./OrderForm.css";
import { useCart } from "../../context/CartContext";
import { useOrderSave } from "./hook/use-SaveOrder";
import { Order } from "../../interface/Order";
import { PaymentStatus } from "../../enum/Paid";
import { OrderStatus } from "../../enum/OrderStatus";

interface OrderFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ show, setShowModal }) => {
  const { cart, clearCart } = useCart();
  const [idPreference, setIdPreference] = useState<string | null>(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const orderPost = useOrderSave();

  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const discount = !isDelivery ? parseFloat((subtotal * 0.1).toFixed(2)) : 0;
  const total = subtotal - discount;

  const totalCookingTime = cart.reduce((acc, i) => {
    if (i.item.cookingTime) {
      const [hours, minutes, seconds] = i.item.cookingTime.split(":").map(Number);
      acc += hours * 3600 + minutes * 60 + seconds;
    }
    return acc;
  }, 0);
  const totalHours = Math.floor(totalCookingTime / 3600);
  const totalMinutes = Math.floor((totalCookingTime % 3600) / 60);
  const totalSeconds = totalCookingTime % 60;
  const totalTimeString = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`;

  const handleSaveUpdate = async (o: Order) => {
    if (o.paymentType !== "mp") {
      setConfirmed(true);
      setTimeout(() => {
        clearCart();
        setShowModal(false);
        setConfirmed(false);
      }, 2000);
    }
    clearCart();
    const response = await orderPost(o);
    if (response && o.paymentType === "mp") {
      setIdPreference(response.preferenceId);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: 0,
      address: "",
      apartment: "",
      deliveryMethod: "",
      paymentType: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const order: Order = {
        address: values.address,
        apartment: values.apartment,
        discount,
        estimatedTime: totalTimeString,
        paid: values.paymentType !== "mp" ? PaymentStatus.APPROVED : PaymentStatus.IN_PROCESS,
        state: OrderStatus.PENDING,
        isCanceled: false,
        phone: String(values.phone),
        total,
        deliveryMethod: values.deliveryMethod,
        orderDetails: cart,
        paymentType: values.paymentType,
        dateTime: new Date(),
      };
      handleSaveUpdate(order);
    },
  });

  if (!show) return null;

  return (
    <div className="order-overlay" onClick={() => setShowModal(false)}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="order-header">
          <div>
            <p className="order-label">Confirmar pedido</p>
            <p className="order-sub">{cart.length} productos · ${subtotal.toLocaleString("es-AR")}</p>
          </div>
          <button className="order-close" onClick={() => setShowModal(false)} aria-label="Cerrar">
            <RxCross2 />
          </button>
        </div>

        <div className="order-divider" />

        {!idPreference ? (
          <form onSubmit={formik.handleSubmit} className="order-form">

            {/* Items del carrito */}
            <div className="order-items">
              {cart.map((product, i) => (
                <div key={i} className="order-item">
                  <img
                    src={product.item.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                    alt={product.item.denomination}
                  />
                  <div className="order-item-info">
                    <span className="order-item-name">{product.item.denomination}</span>
                    {product.item.description && (
                      <span className="order-item-desc">{product.item.description}</span>
                    )}
                  </div>
                  <div className="order-item-right">
                    <span className="order-item-qty">x{product.quantity}</span>
                    <span className="order-item-price">${product.subtotal.toLocaleString("es-AR")}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-divider" />

            {/* Método de entrega */}
            <div className="order-section">
              <p className="order-section-title">Método de entrega</p>
              <div className="order-radio-group">
                <label className={`order-radio-label ${formik.values.deliveryMethod === "delivery" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    onChange={() => {
                      formik.setFieldValue("deliveryMethod", "delivery");
                      formik.setFieldValue("paymentType", "");
                      setIsDelivery(true);
                    }}
                  />
                  <span className="radio-mark" />
                  Delivery
                </label>
                <label className={`order-radio-label ${formik.values.deliveryMethod === "local" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="local"
                    onChange={() => {
                      formik.setFieldValue("deliveryMethod", "local");
                      formik.setFieldValue("paymentType", "");
                      setIsDelivery(false);
                    }}
                  />
                  <span className="radio-mark" />
                  Retiro en local
                  <span className="order-badge-discount">10% off</span>
                </label>
              </div>
            </div>

            {/* Campos de delivery */}
            {formik.values.deliveryMethod === "delivery" && (
              <div className="order-delivery-fields">
                <div className="order-field">
                  <label className="order-field-label">Teléfono</label>
                  <input
                    className={`order-input ${formik.errors.phone && formik.touched.phone ? "error" : ""}`}
                    type="number"
                    name="phone"
                    placeholder="Ej: 2994000000"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <span className="order-field-error">{formik.errors.phone}</span>
                  )}
                </div>
                <div className="order-field">
                  <label className="order-field-label">Dirección</label>
                  <input
                    className={`order-input ${formik.errors.address && formik.touched.address ? "error" : ""}`}
                    type="text"
                    name="address"
                    placeholder="Calle y número"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <span className="order-field-error">{formik.errors.address}</span>
                  )}
                </div>
                <div className="order-field">
                  <label className="order-field-label">Departamento <span className="order-field-optional">(opcional)</span></label>
                  <input
                    className="order-input"
                    type="text"
                    name="apartment"
                    placeholder="Piso / depto"
                    onChange={formik.handleChange}
                    value={formik.values.apartment}
                  />
                </div>
              </div>
            )}

            {/* Forma de pago */}
            {formik.values.deliveryMethod !== "" && (
              <div className="order-section">
                <p className="order-section-title">Forma de pago</p>
                <div className="order-radio-group">
                  <label className={`order-radio-label disabled`}>
                    <input type="radio" name="paymentType" value="mp" disabled />
                    <span className="radio-mark" />
                    Mercado Pago
                    <span className="order-badge-soon">Próximamente</span>
                  </label>
                  <label className={`order-radio-label ${formik.values.paymentType === "cash" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="cash"
                      checked={formik.values.paymentType === "cash"}
                      onChange={formik.handleChange}
                    />
                    <span className="radio-mark" />
                    Efectivo
                  </label>
                </div>
              </div>
            )}

            <div className="order-divider" />

            {/* Totales */}
            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              {discount > 0 && (
                <div className="order-total-row discount">
                  <span>Descuento retiro en local (10%)</span>
                  <span>− ${discount.toLocaleString("es-AR")}</span>
                </div>
              )}
              <div className="order-total-row final">
                <span>Total</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>
            </div>

            {/* Botón submit */}
            {confirmed ? (
              <div className="order-success">
                <BsCheckCircle className="success-icon" />
                <span>¡Pedido confirmado!</span>
              </div>
            ) : (
              <button
                type="submit"
                className="order-confirm-btn"
                disabled={!formik.isValid || formik.values.deliveryMethod === "" || formik.values.paymentType === ""}
              >
                Confirmar pedido
              </button>
            )}

          </form>
        ) : (
          <div className="order-mp-placeholder">
            <p className="order-label">Mercado Pago</p>
            <p className="order-sub">Próximamente disponible</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderForm;