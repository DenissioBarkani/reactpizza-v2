import React, { Component, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/skeleton';
import PizzaBlock from '../components/PizzaBlock';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryID, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    useEffect(() => {
        setIsLoading(true);
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryID > 0 ? `category=${categoryID}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        // fetch('https://682e1ef0746f8ca4a47bf828.mockapi.io/items?category=' + categoryID)
        fetch(
            `https://682e1ef0746f8ca4a47bf828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        )
            .then((res) => {
                if (!res.ok) {
                    // Если статус не 200-299
                    throw new Error('Not Found');
                }
                return res.json();
            })
            .then((arr) => {
                setItems(arr); // Проверяем, что это массив
            })
            .catch((err) => {
                console.error('Ошибка при загрузке данных:', err);
                setItems([]); // В случае ошибки - пустой массив
            })
            .finally(() => {
                setIsLoading(false); // В любом случае снимаем загрузку
            });
        window.scrollTo(0, 0);
    }, [categoryID, sortType, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    //  const pizzas = items.filter(obj => {
    //     if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true
    //     }
    //     return false
    // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>);
    return (
        <div className="container">
            <div class="content__top">
                <Categories value={categoryID} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">{isLoading ? skeletons : pizzas}</div>

            <Pagination onChangePage={(number) => setCurrentPage(number)}></Pagination>
        </div>
    );
};
// <PizzaBlock key={obj} title={obj.title} price={obj.price} sizes={obj.sizes} types={obj.types}/>

export default Home;
