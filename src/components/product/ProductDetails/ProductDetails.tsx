// Importaciones de dependencias
import { useParams } from "react-router-dom";

// Importaciones de componenetes, funciones y modelos
import ProductDetailsCard from "./ProductDetailsCard/ProductDetailsCard";

// Importaciones de estilos
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Product } from "../../../interface/Product";
import { useGenericPublicGetXID } from "../../../services/useGenericPublicGetXID";

/**
 * Propiedades del componente ProductDetails. (temporales ya que hay que hay que desarrollar query para los productos relacionados)
 * @prop {Product[]} products - Un array de objetos Product para mostrar el carrusel de productos relacionados.
 */

// explicacion del componente
const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  // Estado para almacenar las manufactured-products
  const [item, setItem] = useState<Product | null>();

  const data = ( productId) ? useGenericPublicGetXID<Product>(
    `/api/price/p`,
    productId, true
  ) : null;


  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  if (!productId) {
    return <div>No se encontró el producto</div>;
  }



  // Renderizado del componente
  return (
    <>
      {(item !== null && item !== undefined) && (

        <div className="product-details-page">
          <ProductDetailsCard product={item}  />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
