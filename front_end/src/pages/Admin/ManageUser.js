import React from "react";
import { Sidebar, ShopAnalytics, ProductAnalytics, SalesChart,UserTable } from "../../components/index";


const ManageUser = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Quản lý Người dùng</h1>
        <UserTable />
      </div>
    </div>
  );
};

export default ManageUser;
