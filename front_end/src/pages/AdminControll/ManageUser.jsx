import React from "react";
import { Sidebar,NavbarAdmin,UserTable } from "../../components/index";


const ManageUser = () => {
  return (
    <div>
      <NavbarAdmin/>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "50px", width: "100%",backgroundImage: 'url("/images/background.jpg")'}} className="mt-5">
          <h1 className="text-center" style={{color:"white"}}>Quản lý Người dùng</h1>
          <UserTable />
        </div>
      </div>
      </div>
  );
};

export default ManageUser;
