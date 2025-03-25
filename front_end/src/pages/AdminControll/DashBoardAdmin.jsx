import React from "react";
import { Sidebar, NavbarAdmin, ShopAnalytics, ProductAnalytics, SalesChart} from "../../components"; 

const DashBoardAdmin = () => {
  console.log("DashBoardShop rendered!");
  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />
        
        <div style={{ marginLeft: "250px", padding: "50px", width: "100%", backgroundImage: 'url("/images/background.jpg")'  }} className="mt-5">
          <h1 className="text-center">Thống kê tổng quát</h1>
          <ShopAnalytics />
          <ProductAnalytics/>
          <SalesChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
