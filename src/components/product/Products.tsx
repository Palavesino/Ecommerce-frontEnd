// Importaciones de dependencias
import { useEffect, useState } from "react";

// Importaciones de componenetes, funciones y modelos

// Importaciones de estilos
import "./Products.css";
import ProductCard from "./product-card/ProductCard";
import { Product } from "../../interface/Product";
import { useGetItems } from "./hook/use-GetItems";
import { useGenericPublicGet } from "../../services/useGenericPublicGet";
import { Category } from "../../interface/Category";
import CategoryList from "./category-list/CategoryList";

/*
 * Componente de productos
 * El componente muestra una página de productos con tarjetas de productos.
 * Utiliza el componente `CategoryList` para mostrar una lista de categorías de productos.
 * Cada producto se muestra en una tarjeta (`CCard`) con una imagen, título y un botón.
 */
const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategorys] = useState<Category[]>([]);
  const data = useGenericPublicGet<Category>(
    "/api/category/catalogue",
    "Categorías Product",

  );
  const [items, setItems] = useState<Product[]>([]);
  const getItems = useGetItems();

  useEffect(() => {
    async function getProducts() {
      const fetchedItems = await getItems();
      if (fetchedItems) {
        setItems(fetchedItems);
      }
    }
    if (data && data.length > 0) {
      getProducts();
      setCategorys(data);
    }
  }, [data]);
  console.log(selectedCategory)
  const filteredProducts = selectedCategory ?
    items.filter((item) => item.categoryId === selectedCategory)
    : items;

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="products-page">
      <div className="categories-container">
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <div className="products-container">
        {filteredProducts && filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
};

export default Products;
