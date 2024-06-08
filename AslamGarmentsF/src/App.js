import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Shop from './pages/shop';
import About from './pages/about';
import "./css/mobile.css"
import Service from './pages/service';
import { BaseProvider } from './BaseContext';
import Login from './pages/login';
import UserProfile from './pages/profile';
import Product from './pages/product';
import Cart from './pages/cart';

function App() {
  return (
    <BaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path='/product/:pid' element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </BaseProvider>
  );
}

export default App;
