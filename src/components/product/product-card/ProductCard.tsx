// Importaciones de Dependemcias
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
} from "@coreui/react";
import { Link } from "react-router-dom";

// Importaciones de estilos
import "./ProductCard.css";
import { Product } from "../../../interface/Product";

/**
 * Propiedades del componente ProductCard.
 * @prop {Product} product - El objeto Product que representa un producto a mostrar.
 */
interface ProductCardProps {
  product: Product;
}

/*
 * Componente para mostrar un producto en forma de tarjeta.
 * Recibe la propiedad `product` que representa los datos del producto a mostrar.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Ruta base según entorno (desarrollo/producción)
  const imageUrl = product.imageUrl
    ? `${product.imageUrl}`
    : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  return (
    <CCard className="cui-product-card">
      <CCardImage orientation="top" src={`${imageUrl}`} />
      <CCardBody className="cui-product-card-body">
        <CCardTitle className="cui-product-card-body-tittle">
          {product.denomination}
        </CCardTitle>
        <CButton className="cui-product-card-body-button">
          <Link
            to={`/productos/${product.id}`}
            className="cui-product-card-body-button-text"
          >
            Detalles del producto
          </Link>
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default ProductCard;
