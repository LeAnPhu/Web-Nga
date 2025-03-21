import React from "react";
import { Sidebar,NavbarAdmin,ProductTable} from "../../components/index";


const ManageProduct = () => {
  return (
    <div>
      <NavbarAdmin/>
        <div style={{ display: "flex" }} >
          <Sidebar />
          <div style={{ marginLeft: "250px", padding: "50px", width: "100%" }} className="mt-5">
            <h1 className="text-center">Quản lý Sản phẩm</h1>
            <ProductTable />
          </div>
        </div>
    </div>
  );
};

export default ManageProduct;
