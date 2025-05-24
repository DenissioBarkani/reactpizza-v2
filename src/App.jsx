// import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart.jsx';
import { createContext, useState } from 'react';

const SearchContext = createContext();

function App() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="App">
            <div class="wrapper">
                <SearchContext.Provider value={{searchValue, setSearchValue}}>
                    <Header />
                    <div class="content">
                        {/* <div class="container"> */}
                        <Routes>
                            <Route
                                path="/"
                                element={<Home searchValue={searchValue}></Home>}></Route>
                            <Route path="/cart" element={<Cart></Cart>}></Route>
                            <Route path="*" element={<NotFound></NotFound>}></Route>
                        </Routes>

                        {/* </div> */}
                    </div>
                </SearchContext.Provider>
            </div>
        </div>
    );
}

export default App;
