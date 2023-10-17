import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Navbar from './header/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CheckOut from './pages/CheckOut';
import { useContext } from 'react';
import Context from './context/Context';
import ViewProduct from './components/ViewProduct';
import Login from './components/Login';
import PaymentConfirmation from './pages/PaymentConfirmation';

function App() {

  const state = useContext(Context)

  return (
    <BrowserRouter>
      {state.viewProductModal && <ViewProduct product={state.viewProduct} />}
      {state.loginModal && <Login />}
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/check-out' element={<CheckOut />} />
        <Route path='/payment-confirmation/:status/:reference' element={<PaymentConfirmation />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
