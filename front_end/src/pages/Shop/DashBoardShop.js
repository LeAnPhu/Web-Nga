import React from "react";
import { SideBarShop, NavbarShop, SalesAnalytics, ProductAnalyticsShop,FollowerAnalytics} from "../../components"; 

const DashBoardShop = () => {
  console.log("DashBoardShop rendered!");
  return (
    <div>
      {/* Navbar */}
      <NavbarShop/>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SideBarShop />
        
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }} className="mt-5" >
          <h1 className="text-center">Thống kê tổng quát</h1>
          <FollowerAnalytics />
          <SalesAnalytics />
          <ProductAnalyticsShop />
        </div>
      </div>
    </div>
  );
};

export default DashBoardShop;
