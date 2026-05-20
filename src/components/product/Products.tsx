import { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "./product-card/ProductCard";
import { Product } from "../../interface/Product";
import { useGetItems } from "./hook/use-GetItems";
import { useGenericPublicGet } from "../../services/useGenericPublicGet";
import { Category } from "../../interface/Category";
import CategoryList from "./category-list/CategoryList";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const getItems = useGetItems();

  const data = useGenericPublicGet<Category>(
    "/api/category/catalogue",
    "Categorías Product"
  );

  useEffect(() => {
    async function getProducts() {
      const fetchedItems = await getItems();
      if (fetchedItems) setItems(fetchedItems);
    }
    if (data && data.length > 0) {
      getProducts();
      setCategories(data);
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? items.filter((item) => item.categoryId === selectedCategory)
    : items;

  // Nombre de la categoría seleccionada para el título
  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.denomination ?? "Productos"
    : "Todos los productos";

  return (
    <div className="products-page">
      {/* Sidebar de categorías */}
      <div className="categories-container">
        <CategoryList
          categories={categories}
          onCategoryClick={(id) => setSelectedCategory(id)}
        />
      </div>

      {/* Área de productos */}
      <div className="products-area">
        <div className="section-header">
          <h1 className="section-title">{selectedCategoryName}</h1>
          <span className="section-count">{filteredProducts.length} productos</span>
        </div>

        <div className="products-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;