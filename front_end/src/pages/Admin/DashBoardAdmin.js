import React from "react";
import { Sidebar, NavbarAdmin, ShopAnalytics, ProductAnalytics, SalesChart, CategoriesAdmin} from "../../components"; 

const DashBoardAdmin = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />
        
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }} className="mt-5">
          <h1 className="text-center">Thống kê tổng quát</h1>
          <ShopAnalytics />
          <ProductAnalytics />
          <SalesChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
