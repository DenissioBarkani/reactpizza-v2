// import './App.css';
import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
// import { decrement, increment } from './redux/slices/filterslice.js';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

// function Parent({ children }: any) {
//     return (
//         <div>
//             <h1>Заголовок</h1>
//             <Outlet></Outlet>
//             {children}
//         </div>
//     );
// }

function App() {
    // const [searchValue, setSearchValue] = useState('');
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
