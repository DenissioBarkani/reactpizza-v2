// import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart.jsx';
import { useState } from 'react';

function App() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="App">
            <div class="wrapper">
                <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div class="content">
                    {/* <div class="container"> */}
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue}></Home>}></Route>
                        <Route path="/cart" element={<Cart></Cart>}></Route>
                        <Route path="*" element={<NotFound></NotFound>}></Route>
                    </Routes>

                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default App;
