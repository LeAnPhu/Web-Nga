import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardShop,ManageOrderShop, ManageCouponShop, ManageProductShop } from "../../pages";

const ShopRouter = () => {
  return (
    <Routes>
        <Route index element={<Navigate to="/shop/dashboard" />} />
      <Route path="dashboard" element={<DashBoardShop />} />
      <Route path="orders" element={<ManageOrderShop />} />
      <Route path="coupons" element={<ManageCouponShop />} />
      <Route path="products" element={<ManageProductShop/>} />
    </Routes>
  );
};

export default ShopRouter;
