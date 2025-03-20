import React from "react";
import { Sidebar, NavbarAdmin, ShopAnalytics, ProductAnalytics, SalesChart } from "../../components"; 

const DashBoardAdmin = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />
        
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
          <h1 className="text-center">Dashboard Admin</h1>
          <ShopAnalytics />
          <ProductAnalytics />
          <SalesChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
