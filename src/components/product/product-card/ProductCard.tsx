import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CCard, CCardBody, CCardImage, CCardTitle } from "@coreui/react";
import { useCart } from "../../../context/CartContext";
import { Product } from "../../../interface/Product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const imageUrl = product.imageUrl
    ? product.imageUrl
    : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

  const handleAddToCart = () => {
    console.log(JSON.stringify(product,null,2))
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDetail = () => {
    navigate(`/productos/${product.id}`, { state: { product } });
  };

  return (
    <CCard className="cui-product-card">
      <div className="card-img-wrap">
        <CCardImage orientation="top" src={imageUrl} alt={product.denomination} />
        <div className="card-img-overlay">
          <button className="overlay-detail-btn" onClick={handleDetail}>
            Ver detalle
          </button>
        </div>
      </div>

      <CCardBody className="cui-product-card-body">
        <CCardTitle className="cui-product-card-body-tittle">
          {product.denomination}
        </CCardTitle>

        {product.sellPrice && (
          <p className="card-price">
            ${Number(product.sellPrice).toLocaleString("es-AR")}
          </p>
        )}

        <div className="card-actions">
          <button
            className={`btn-add-cart-card ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Agregado" : "+ Agregar"}
          </button>
          <button className="btn-detail-card" onClick={handleDetail}>
            Detalles
          </button>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ProductCard;