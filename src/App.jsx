// import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Cart from './pages/Cart.jsx';
import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/slices/filterslice.js';
import FullPizza from './pages/FullPizza.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function Parent({ children }) {
    return (
        <div>
            <h1>Заголовок</h1>
            <Outlet></Outlet>
            {children}
        </div>
    );
}

function App() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
                <Route path="/pizza/:id" element={<FullPizza></FullPizza>}></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Route>

            {/* <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div> */}
        </Routes>
    );
}

export default App;
