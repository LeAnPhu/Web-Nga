import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/users">Người dùng</Link>
      <Link to="/admin/shops">Cửa hàng</Link>
      <Link to="/admin/products">Sản phẩm</Link>
      <Link to="/admin/coupons">Mã giảm giá</Link>
      <Link to="/admin/sales">Biểu đồ bán hàng</Link>
    </div>
  );
};

export default Sidebar;
