import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardAdmin, ManageUser, ManageShop, ManageProduct, ManageCategory } from "../../pages";

const AdminRoutes = () => {
  return (
    <Routes>
      
      <Route index element={<Navigate to="/admin/dashboard" />} />
      
      {/* Các route chính của admin */}
      <Route path="dashboard" element={<DashBoardAdmin />} />
      <Route path="users" element={<ManageUser />} />
      <Route path="shops" element={<ManageShop />} />
      <Route path="products" element={<ManageProduct />} />
      <Route path="categories" element={<ManageCategory />}/>
    </Routes>
  );
};

export default AdminRoutes;
