import { useState } from "react";
import { Category } from "../../../interface/Category";
import "./CategoryList.css";

interface CategoryListProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const handleParentClick = (categoryId: string) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleSubClick = (subId: string) => {
    setActiveSub(subId);
    onCategoryClick(subId);
  };

  const parents = categories.filter((c) => c.categoryFatherId === null);

  return (
    <div className="category-list">
      <p className="category-list-title">Categorías</p>

      {parents.map((category) => {
        const children = categories.filter(
          (c) => c.categoryFatherId === category.id
        );
        const isOpen = openCategoryId === category.id;

        return (
          <div key={category.id} className="cat-group">
            <div
              className={`cat-parent ${isOpen ? "open" : ""}`}
              onClick={() => handleParentClick(category.id)}
            >
              <span>{category.denomination}</span>
              <span className={`cat-chevron ${isOpen ? "rotated" : ""}`}>▶</span>
            </div>

            {isOpen && children.length > 0 && (
              <div className="cat-children">
                {children.map((sub) => (
                  <div
                    key={sub.id}
                    className={`cat-child ${activeSub === sub.id ? "active" : ""}`}
                    onClick={() => handleSubClick(sub.id)}
                  >
                    {sub.denomination}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="cat-divider" />

      <p className="category-list-title" style={{ fontSize: "10px", opacity: 0.6 }}>
        Filtros
      </p>
      <div className="filter-list">
        <span className="filter-item">Precio: Todos</span>
        <span className="filter-item">Disponibles</span>
        <span className="filter-item">Novedades</span>
      </div>
    </div>
  );
};

export default CategoryList;