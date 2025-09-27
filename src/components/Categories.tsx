import React from 'react';


interface CategoriesProps {
    value: number;
    OnChangeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, OnChangeCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
 
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => OnChangeCategory(index)}
                        className={value === index ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
