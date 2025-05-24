import React from 'react';

export default function Categories( {value, onClickCategory}) {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    // const onClickCategory = (i) => {
    //     setActiveIndex(i);
    // };

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={value === index ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
