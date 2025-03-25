import React from "react";
import { Sidebar, NavbarAdmin, CategoriesAdmin } from "../../components/index";

const ManageCategory = () => {
  return (
    <div>
      <NavbarAdmin />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "50px", width: "100%", backgroundImage: 'url("/images/background.jpg")'  }} className="mt-5">
          <h1 className="text-center">Quản lý Danh Mục</h1>
          <CategoriesAdmin />
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
