import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense,lazy } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Pain from './category/pain.jsx';
import ProductList from './components/product/ProductList.jsx';
import SingleProduct from './components/product/SingleProduct.jsx';
import Vitamins from './category/vitamins.jsx';
import Wellness from './category/wellness.jsx';
import DoctorPanel from './pages/DoctorPanel.jsx';
import PharmacistPanel from './pages/PharmacistPanel.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import FAQPage from "./pages/FAQpage.jsx";
import Add from './pages/admin/Add.jsx';
const CategoryProducts = lazy(() => import("./components/product/CategoryProducts.jsx"));
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token]);

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-panel" element={<DoctorPanel />} />
          <Route path="/pharmacist-panel" element={<PharmacistPanel />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/category/pain" element={<Pain />} />
          <Route path="/category/vitamins" element={<Vitamins />} />
          <Route path="/category/wellness" element={<Wellness />} />

          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/list-product" element={<ProductList />} />
          <Route path="/product/:name" element={<ProductPage />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<Add token={token} />} />

          <Route path="product/category/:category" element={<CategoryProducts />} />

          {/* Optionally, a fallback route: */}
          {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
