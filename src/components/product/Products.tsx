// Importaciones de dependencias
import { useEffect, useState } from "react";

// Importaciones de componenetes, funciones y modelos

// Importaciones de estilos
import "./Products.css";
import ProductCard from "./product-card/ProductCard";
import {Product } from "../../interface/Product";
import { useGetItems } from "./hook/use-GetItems";

/*
 * Componente de productos
 * El componente muestra una página de productos con tarjetas de productos.
 * Utiliza el componente `CategoryList` para mostrar una lista de categorías de productos.
 * Cada producto se muestra en una tarjeta (`CCard`) con una imagen, título y un botón.
 */
const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const getItems = useGetItems();

  useEffect(() => {
    async function getProducts() {
      const fetchedItems = await getItems();
      if (fetchedItems) {
        setItems(fetchedItems);
      }
    }
    getProducts();
  }, []);


  return (
    <div className="products-page">
      <div className="products-container">
        {items && items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
};

export default Products;
