// Importaciones de dependencias
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";

// Importaciones de estilos
import "./ProductDetailsCard.css";
import { useEffect, useState } from "react";
import { Product } from "../../../../interface/Product";
import { useCart } from "../../../../context/CartContext";


// Esto es temporal hasta que se apliquen las apis al componente con la BD


/**
 * Propiedades del componente ProductDetailsCard.
 * @prop {Product} product - Objeto Product que representara los detalles del producto.
 */
interface ProductDetailsCardProps {
  product: Product | null;
}

// eplicacion del componente
const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [insideCart, SetInsideCart] = useState(false);

  // Verificar si el producto es null o undefined
  if (!product) {
    return <div>No hay información del producto disponible.</div>;
  }
  const imageUrl = product.imageUrl ? product.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'
  useEffect(() => {
    const checkProductInCart = () => {
      return cart.some(i => (i.item?.id === product.id))
    }
    SetInsideCart(checkProductInCart);
  }, [product.id]);

  const handleOnClick = () => {
    if (product) {
      if (insideCart) {
        removeFromCart(product);
        SetInsideCart(false);
      } else {
        addToCart(product);
        SetInsideCart(true);
      }
    }
  };
  // Renderizado del componente
  return (
    <CCard
      className="card-product-details"
      style={{ backgroundColor: "transparent", border: "none" }}
    >
      <CRow className="g-0">
        <CCol md={5}>
          <CCardImage orientation="top" src={`${imageUrl}`} />
        </CCol>

        <CCol md={7}>
          <CCardBody>
            <CCardTitle className="card-title">{product.denomination}</CCardTitle>
            <CCardText className="card-description">{product.description}</CCardText>
            <CButton
              onClick={handleOnClick}
              disabled={!product.availability}
              style={{
                borderColor: "#F6BD5A",
                color: "#F6BD5A",
                boxShadow: "inset 11px 20px 9px -20px rgba(255, 201, 0, 0.4)",
                background: "#111",
                borderRadius: "2rem",
              }}
              className="card-button"
            >
              {!product.availability ? 'No Hay Stock' : (insideCart ? "Quitar del Carrito" : "Agregar al carrito")}
            </CButton>
            <CCardText className="card-price">{`$${product.price?.sellPrice}`}</CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  );
};

export default ProductDetailsCard;
