import React from "react";
import { Sidebar, ShopAnalytics, ProductAnalytics, SalesChart , ProductTable} from "../../components/index";


const ManageProduct = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Quản lý Sản phẩm</h1>
        <ProductTable />
      </div>
    </div>
  );
};

export default ManageProduct;
