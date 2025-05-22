import React, { Component, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // https://682e1ef0746f8ca4a47bf828.mockapi.io/items
    // fetch('https://682e1ef0746f8ca4a47bf828.mockapi.io/items').then((res) => {
    //     return res.json();
    // }).then((arr)=> {
    //   setItems(arr)
    // })

    useEffect(() => {
        fetch('https://682e1ef0746f8ca4a47bf828.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="container">
            <div class="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>)
                    : items.map((obj) => (
                          <PizzaBlock key={obj.id} {...obj} />
                          // <PizzaBlock key={obj} title={obj.title} price={obj.price} sizes={obj.sizes} types={obj.types}/>
                      ))}
            </div>
        </div>
    );
};

export default Home;
