import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Shop from './pages/shop';
import About from './pages/about';
import Service from './pages/service';
import { BaseProvider } from './BaseContext';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <BaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </BrowserRouter>
    </BaseProvider>
  );
}

export default App;
