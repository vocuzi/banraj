import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Shop from './pages/shop';
import About from './pages/about';
import Service from './pages/service';
import { BaseProvider } from './BaseContext';
import Login from './pages/login';
import UserProfile from './pages/profile';

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
        </Routes>
      </BrowserRouter>
    </BaseProvider>
  );
}

export default App;
