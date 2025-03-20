import { Routes, Route } from "react-router-dom";
import { DashBoardShop,ManageOrderShop, ManageCouponShop, ManageProductShop } from "../pages";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/shop/dashboard" element={<DashBoardShop />} />
      <Route path="/shop/orders" element={<ManageOrderShop />} />
      <Route path="/shop/coupons" element={<ManageCouponShop />} />
      <Route path="/shop/products" element={<ManageProductShop/>} />
    </Routes>
  );
};

export default AdminRoutes;
