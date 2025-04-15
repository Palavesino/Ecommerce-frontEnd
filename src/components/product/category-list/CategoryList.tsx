import React, { useState } from 'react';
import './CategoryList.css'; // Importa el archivo CSS
import { Category } from '../../../interface/Category';

interface CategoryListProps {
    categories: Category[];
    onCategoryClick: (categoryId: string) => void;
}


const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  
    const handleCategoryClick = (categoryId: string) => {
      setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
    };
  
    return (
        <>
        {categories
          .filter((cat) => cat.categoryFatherId === null)
          .map((category) => (
            <div key={category.id} className="dropdown-item">
              <span
                className="category-label"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.denomination}
              </span>
              {openCategoryId === category.id && (
                <div className="submenu">
                  {categories
                    .filter((cat) => cat.categoryFatherId === category.id)
                    .map((subCategory) => (
                      <div key={subCategory.id} className="submenu-item">
                        <span
                          className="subcategory-label"
                          onClick={() => onCategoryClick(subCategory.id)}
                        >
                          {subCategory.denomination}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </>
    );
  };
  

export default CategoryList;
