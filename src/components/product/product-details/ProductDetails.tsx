import { useLocation, useNavigate } from "react-router-dom";
import ProductDetailsCard from "./product-details-card/ProductDetailsCard";
import "./ProductDetails.css";
import { Product } from "../../../interface/Product";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product as Product | undefined;

  if (!product) {
    return (
      <div className="product-not-found">
        <p>No se encontró el producto.</p>
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <ProductDetailsCard product={product} />
    </div>
  );
};

export default ProductDetails;