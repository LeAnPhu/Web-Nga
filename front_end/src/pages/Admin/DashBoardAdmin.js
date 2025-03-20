import React from "react";
import { Sidebar, ShopAnalytics, ProductAnalytics, SalesChart } from "../../components";

const DashBoardAdmin = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Dashboard Admin</h1>
        <ShopAnalytics />
        <ProductAnalytics />
        <SalesChart />
      </div>
    </div>
  );
};

export default DashBoardAdmin;
