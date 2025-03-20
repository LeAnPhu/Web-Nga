import React from "react";
import { Sidebar, ShopTable, NavbarAdmin } from "../../components/index";


const ManageShop = () => {
  return (
    <div>
      <NavbarAdmin/>
        <div style={{ display: "flex" }}>
          <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
            <h1 className="text-center">Quản lý Cửa hàng</h1>
          <ShopTable />
        </div>
      </div>
    </div>
  );
};

export default ManageShop;
