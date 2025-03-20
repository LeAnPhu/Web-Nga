import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardAdmin, ManageUser, ManageShop, ManageProduct, ManageCategory } from "../../pages";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<DashBoardAdmin />} />
      <Route path="/admin/users" element={<ManageUser />} />
      <Route path="/admin/shops" element={<ManageShop />} />
      <Route path="/admin/products" element={<ManageProduct />} />
      <Route path="/admin/categories" element={<ManageCategory />} />
    </Routes>
  );
};

export default AdminRoutes;