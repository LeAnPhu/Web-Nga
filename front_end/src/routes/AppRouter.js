import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, About, Store,CartPage,CheckoutPage } from '../pages';




const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path ="/store" element ={<Store/>}/>
      <Route path ="/cart" element={<CartPage/>}/>
      <Route path ="/checkout" element={<CheckoutPage/>}/>
    </Routes>

  );
}

export default AppRouter;
