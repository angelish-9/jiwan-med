import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
const Profile = lazy(() => import("./pages/Profile.jsx"));
import ProductPage from './pages/ProductPage.jsx';
import Pain from './category/pain.jsx';
import ProductList from './components/product/ProductList.jsx';
import SingleProduct from './components/product/SingleProduct.jsx';
import Vitamins from './category/vitamins.jsx';
import Wellness from './category/wellness.jsx';
import DoctorPanel from './pages/DoctorPanel.jsx';
import PharmacistPanel from './pages/PharmacistPanel.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Add from './pages/admin/Add.jsx';
import UpdateRole from './pages/admin/UpdateRole.jsx';
import FAQPage from "./pages/FAQpage.jsx";

const CategoryProducts = lazy(() => import("./components/product/CategoryProducts.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
import ChatComponent from "./components/ChatComponent.jsx";
import PharmacistDashboard from './components/PharmacistDashboard';

import './App.css';

function App() {
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Define pharmacist details for chat functionality
  const pharmacistId = '67fa35639fe7c1d32b2f8800'; 
  const pharmacistName = 'Dr. John Doe'; 

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
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
          <Route path="/admin/update-role" element={<UpdateRole token={token} />} />

          <Route path="product/category/:category" element={<CategoryProducts />} />

          <Route path="/cart" element={<CartPage />} />

          {/* Add the ChatComponent route */}
          <Route path="/consult-pharmacists" element={<ChatComponent receiverId={pharmacistId} receiverName={pharmacistName} />} />

          <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />  {/* Dashboard Page */}

          {/* Optionally, a fallback route: */}
          {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
