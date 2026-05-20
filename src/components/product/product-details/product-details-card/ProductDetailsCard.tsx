import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";
import { Product } from "../../../../interface/Product";
import { useState } from "react";
import "./ProductDetailsCard.css";

interface Props {
  product: Product;
}

const ProductDetailsCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const imageUrl = product.imageUrl
    ? product.imageUrl
    : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="details-card">
      {/* Imagen */}
      <div className="details-img-wrap">
        <img src={imageUrl} alt={product.denomination} />
      </div>

      {/* Info */}
      <div className="details-body">
        <span className="details-category">El Buen Sabor</span>

        <h1 className="details-name">{product.denomination}</h1>

        <div className="details-divider" />

        {product.description && (
          <p className="details-description">{product.description}</p>
        )}

        {product.cookingTime && (
          <p className="details-meta">
            ⏱ Tiempo de preparación: {product.cookingTime} min
          </p>
        )}

        {product.sellPrice && (
          <div className="details-price">
            ${Number(product.sellPrice).toLocaleString("es-AR")}
          </div>
        )}

        <div className="details-actions">
          <button
            className={`btn-add-cart ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
          </button>
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;