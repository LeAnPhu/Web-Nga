import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, About,Store } from "../pages";
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path ="/store" element ={<Store/>}/>
      <Route path ="/cart" element={<CartPage/>}/>
      <Route path ="/checkout" element={<CheckoutPage/>}/>
    </Routes>

  );
}

export default AppRouter;
