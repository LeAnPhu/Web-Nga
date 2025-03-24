import React from "react";
import { 
  FollowerAnalytics, 
  SalesAnalytics, 
  ProductAnalytics,
  NavbarShop,
  SideBarShop
} from "../../components";

import styles from "../../assets/style/pages/Shop/dashboard.module.css";
const DashBoardShop = () => {
  console.log("DashBoardShop rendered!");
  return (
    <div>
      {/* Navbar */}
      <NavbarShop/>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SideBarShop />
        
        <div style={{ marginLeft: "250px", padding: "50px", width: "100%" }} className={styles.dashboard} >
          <h1 className="text-center">Thống kê tổng quát</h1>
          <FollowerAnalytics />
          <SalesAnalytics />
          <ProductAnalytics />
        </div>
      </div>
    </div>
  );
};

export default DashBoardShop;
