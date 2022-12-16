import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="checkout" element={<CheckoutPage />} />
        {/* 單一商品頁面 */}
        <Route path="product/:id" element={<Product />} />
        <Route path="products/:category" element={<CategoryPage />} />
        {/* 全部商品 */}
        <Route path="products" element={<ProductList />} />
        <Route path="order/:userId" element={<OrderPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
