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
  console.log(import.meta.env.NODE_ENV)
  const basePath = '/../../../../public/uploads'

  const subFolder = product.isManufactured
    ? 'manufactured_products'
    : 'products';

  const imageUrl = product.imageUrl
    ? `${product.imageUrl}`
    : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  return (
    <CCard className="cui-product-card">
      <CCardImage orientation="top" src={`${imageUrl}`} />
      <CCardBody>
        <CCardTitle className="cui-product-card-body-tittle" style={{ marginLeft: "-.1rem", fontSize: "1.3rem" }}>
          {product.denomination}
        </CCardTitle>
        <CButton className="cui-product-card-body-button" style={{ backgroundColor: "rgb(17, 17, 17)", borderColor: "rgb(246, 189, 90)" }}>
          <Link
            to={`/productos/${product.id}`}
            className="cui-product-card-body-button-text"
            style={{ color: "rgb(246, 189, 90)" }}
          >
            Detalles del producto
          </Link>
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default ProductCard;
