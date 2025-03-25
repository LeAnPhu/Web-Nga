import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, About, Store, CartPage, CheckoutPage, ProductDetails, StoreDetail } from "../pages";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/store/:id" element={<StoreDetail/>} />
    </Routes>
  );
};

export default AppRouter;
