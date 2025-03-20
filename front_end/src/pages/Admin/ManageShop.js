import React from "react";
import { Sidebar, ShopAnalytics, ProductAnalytics, SalesChart,ShopTable } from "../../components/index";


const ManageShop = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Quản lý Cửa hàng</h1>
        <ShopTable />
      </div>
    </div>
  );
};

export default ManageShop;
