import { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterslice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';

const Home = () => {
    const navigate = useNavigate();
    // const [items, setItems] = useState([]);
    const { items, status } = useSelector(selectPizzaData); // данные из Redux
    // const [isLoading, setIsLoading] = useState(true);

    const isSearch = useRef(false); // флаг: были ли параметры из URL (чтобы не делать лишний fetch)
    const isMounted = useRef(false); // флаг: первый рендер (чтобы не пушить query в URL сразу)

    // const searchValue = useContext(SearchContext); // строка поиска из App (через Context)
    const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter); // данные из Redux
    const sortType = sort.sortProperty;

    const dispatch = useDispatch();

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const OnChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const getPizzas = async () => {
        // setIsLoading(true); // показать скелетоны
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // await axios
        //     .get(
        //         `https://682e1ef0746f8ca4a47bf828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        //     )
        //     .then((res) => {
        //         if (res.status < 200 || res.status >= 300) {
        //             throw new Error(`HTTP error! status: ${res.status}`);
        //         }
        //         return setItems(res.data); // сохраняем пиццы
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.error('Server error:', error.response.status);
        //         } else {
        //             console.error('Request error:', error.message);
        //         }
        //     })
        //     .finally(() => {
        //         setIsLoading(false); // скрываем скелетоны
        //     });

        // try {

        // } catch (error) {
        //     console.log('Error', error);
        // } finally {
        //     // setIsLoading(false); // скрываем скелетоны
        // }

        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage,
            }),
        ); // сохраняем пиццы
    };

    // 🔹 1. При первом рендере — если есть параметры в URL, парсим и сохраняем в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortObj = sortList.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    currentPage: Number(params.currentPage),
                    categoryId: Number(params.categoryId),
                    sort: sortObj, // если нет — undefined
                }),
            );
            isSearch.current = true; // активируем флаг, чтобы в следующем эффекте не делать fetch
        }
    }, []);

    // 🔹 2. Когда меняются фильтры или строка поиска — получаем данные с сервера
    useEffect(() => {
        window.scrollTo(0, 0); // при любом фильтре скроллим вверх

        if (isSearch.current) {
            getPizzas(); // если был переход с параметрами, делаем fetch один раз
            isSearch.current = false; // и сбрасываем флаг
        } else {
            getPizzas(); // обычный случай — при изменении фильтра, страницы, строки поиска
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // 🔹 3. Когда меняются параметры (после действия пользователя) — обновляем URL
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`); // пушим в URL
        }
        isMounted.current = true; // первый рендер прошёл — теперь можно пушить
    }, [categoryId, sortType, currentPage]);

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
            {status === 'error' ? (
                <div className="content__error-info">
                    <br />
                    <h2>Ошибка</h2>
                    <br />
                    <br />
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}></Pagination>
        </div>
    );
};
// <PizzaBlock key={obj} title={obj.title} price={obj.price} sizes={obj.sizes} types={obj.types}/>

export default Home;
