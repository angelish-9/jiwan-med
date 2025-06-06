import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
const Profile = lazy(() => import("./pages/Profile.jsx"));
import ProductPage from './pages/ProductPage.jsx';
import ProductList from './components/product/ProductList.jsx';
import SingleProduct from './components/product/SingleProduct.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Add from './pages/admin/Add.jsx';
import EditProduct from "./pages/admin/EditProduct.jsx";
import UpdateRole from './pages/admin/UpdateRole.jsx';
import FAQPage from "./pages/FAQpage.jsx";

const CategoryProducts = lazy(() => import("./components/product/CategoryProducts.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import MyOrdersPage from './pages/MyOrdersPage.jsx';
import AdminOrdersPage from "./pages/admin/OrderAdmin.jsx";
import ChatComponent from "./components/ChatComponent.jsx";
import PharmacistDashboard from './components/PharmacistDashboard';

const AdminPromoCodes = lazy(() => import("./pages/admin/AdminPromoCodes.jsx"));

import AppointmentList from "./pages/admin/AppointmentList.jsx";
import AppointmentForm from "./components/AppointmentForm.jsx";
import DoctorDashboard from "./components/DoctorDashboard.jsx";

import './App.css';

function App() {
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Define pharmacist details for chat functionality
  const pharmacistId = '67fa35639fe7c1d32b2f8800'; 
  // const pharmacistId = '67f13a0db6f385b6a66e62a8';
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
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/list-product" element={<ProductList />} />
          <Route path="/product/:name" element={<ProductPage />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<Add token={token} />} />
          <Route path="/admin/edit/:productId" element={<EditProduct />} />
          <Route path="/admin/update-role" element={<UpdateRole token={token} />} />

          <Route path="product/category/:category" element={<CategoryProducts />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />

          <Route path="/admin/promocodes" element={<AdminPromoCodes />} />

          <Route path="admin/appointment-list" element={<AppointmentList />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

          {/* Add the ChatComponent route */}
          <Route path="/consult-pharmacists" element={<ChatComponent receiverId={pharmacistId} receiverName={pharmacistName} />} />

          <Route path="/pharmacist-inbox" element={<PharmacistDashboard />} /> 

          {/* Optionally, a fallback route: */}
          {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
