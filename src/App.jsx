// import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart.jsx';
import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/slices/filterslice.js';

export const SearchContext = createContext();

function App() {

    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="App">
            <div class="wrapper">
                <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                    <Header />
                    <div class="content">
              
                        <Routes>
                            <Route path="/" element={<Home></Home>}></Route>
                            <Route path="/cart" element={<Cart></Cart>}></Route>
                            <Route path="*" element={<NotFound></NotFound>}></Route>
                        </Routes>

   
                    </div>
                </SearchContext.Provider>
            </div>

            {/* <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div> */}
        </div>
    );
}

export default App;
