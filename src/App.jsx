// import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart.jsx';

function App() {
    return (
        <div className="App">
            <div class="wrapper">
                <Header />
                <div class="content">
                    {/* <div class="container"> */}
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
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
