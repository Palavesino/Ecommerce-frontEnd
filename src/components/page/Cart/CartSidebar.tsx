import { useCart } from "../../../context/CartContext";
import { RxCross2 } from "react-icons/rx";
import { BsCartXFill, BsCartCheckFill } from "react-icons/bs";
import { useState } from "react";
import Counter from "../../page/Cart/Counter";
import OrderForm from "../../order/OrderForm";
import "./CartSidebar.css";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Panel lateral */}
      <aside className={`cart-sidebar ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title-wrap">
            <span className="sidebar-label">Tu pedido</span>
            <span className="sidebar-count">{cart.length} productos</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Cerrar carrito">
            <RxCross2 />
          </button>
        </div>

        <div className="sidebar-divider" />

        {/* Items */}
        <div className="sidebar-items">
          {cart.length === 0 ? (
            <div className="sidebar-empty">
              <BsCartXFill className="empty-icon" />
              <p>Tu carrito está vacío</p>
              <button className="btn-continue" onClick={onClose}>
                Ver productos →
              </button>
            </div>
          ) : (
            cart.map((product, index) => (
              <div key={index} className="sidebar-item">
                <div className="item-img-wrap">
                  <img
                    src={
                      product.item.imageUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                    }
                    alt={product.item.denomination}
                  />
                </div>
                <div className="item-info">
                  <span className="item-name">{product.item.denomination}</span>
                  <span className="item-price">
                    ${product.item.sellPrice}
                  </span>
                  <Counter
                    width={12}
                    quantity={product.quantity || 1}
                    item={product.item}
                  />
                </div>
                <button
                  className="item-remove"
                  onClick={() => removeFromCart(product.item)}
                  aria-label="Eliminar"
                >
                  <RxCross2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="sidebar-footer">
            <div className="sidebar-divider" />
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-amount">${total}</span>
            </div>
            <button
              className="btn-checkout"
              onClick={() => setShowModal(true)}
            >
              Confirmar pedido <BsCartCheckFill />
            </button>
            <button
              className="btn-clear"
              onClick={() => clearCart()}
            >
              <BsCartXFill /> Vaciar carrito
            </button>
          </div>
        )}
      </aside>

      {showModal && (
        <OrderForm show={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default CartSidebar;