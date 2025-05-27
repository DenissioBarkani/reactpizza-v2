import React, { Component, useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterslice';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [categoryID, setCategoryId] = React.useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности',
    //     sortProperty: 'rating',
    // });

    const searchValue = useContext(SearchContext);
    // const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const { sort, categoryId, currentPage } = useSelector((state) => state.filter);
    const sortType = sort.sortProperty;

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const dispatch = useDispatch();
    const OnChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    useEffect(() => {
        setIsLoading(true);
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        // fetch('https://682e1ef0746f8ca4a47bf828.mockapi.io/items?category=' + categoryID)
        // fetch(
        //     `https://682e1ef0746f8ca4a47bf828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        // )
        //     .then((res) => {
        //         if (!res.ok) {
        //             // Если статус не 200-299
        //             throw new Error('Not Found');
        //         }
        //         return res.json();
        //     })
        //     .then((arr) => {
        //         setItems(arr); // Проверяем, что это массив
        //     })
        //     .catch((err) => {
        //         console.error('Ошибка при загрузке данных:', err);
        //         setItems([]); // В случае ошибки - пустой массив
        //     })
        //     .finally(() => {
        //         setIsLoading(false); // В любом случае снимаем загрузку
        //     });

        axios
            .get(
                `https://682e1ef0746f8ca4a47bf828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
            )
            .then((res) => {
                // if (res.statusText !== "OK") {
                //     // Если статус не 200-299
                //     throw new Error('Not Found');
                // }
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                console.log(res.statusText);
                return setItems(res.data);
            })
            .catch((error) => {
                if (error.response) {
                    // Сервер ответил с кодом ошибки (4xx, 5xx)
                    console.error('Server error:', error.response.status);
                } else {
                    // Другие ошибки (нет соединения и т.д.)
                    console.error('Request error:', error.message);
                }
            })
            .finally(() => {
                setIsLoading(false); // В любом случае снимаем загрузку
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

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
            <div className="content__top">
                {/* setCategoryId */}
                <Categories value={categoryId} onClickCategory={(i) => OnChangeCategory(i)} />
                <Sort />
                {/* <Sort value={sortType} onChangeSort={(i) => setSortType(i)} /> */}
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>

            <Pagination currentPage={currentPage} onChangePage={onChangePage}></Pagination>
        </div>
    );
};
// <PizzaBlock key={obj} title={obj.title} price={obj.price} sizes={obj.sizes} types={obj.types}/>

export default Home;
