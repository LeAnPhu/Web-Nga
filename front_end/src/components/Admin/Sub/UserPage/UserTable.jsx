import React, { useState } from "react";
import UserSearchBar from "./UserSearchBar";
import UserTableBody from "./UserTableBody";
import PaginationComponent from "../../../General/UI/PaginationComponent";

const UserTable = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Nguyễn Văn Neymar", email: "van.a@gmail.com", status: "Hoạt động",img: require("../../../../assets/image/user/user_1.jpg"), },
        { id: 2, name: "Trần Thị Mohamed", email: "thi.b@gmail.com", status: "Tạm khóa",img: require("../../../../assets/image/user/user_2.jpg"), },
        { id: 3, name: "Lê Văn Ronaldo", email: "van.c@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/user/user_3.jpg"),},
        { id: 4, name: "Phạm Minh Foden", email: "minh.d@gmail.com", status: "Tạm khóa", img: require("../../../../assets/image/user/user_4.jpg"),},
        { id: 5, name: "Võ Quốc E", email: "quoc.e@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/user/user_5.jpg"),},
        { id: 6, name: "Đỗ Thanh F", email: "thanh.f@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/user/user_6.jpg"),},
        { id: 7, name: "Ngô Hoàng G", email: "hoang.g@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/user/user_4.jpg"),},
        { id: 8, name: "Tạ Quang H", email: "quang.h@gmail.com", status: "Tạm khóa", img: require("../../../../assets/image/user/user_3.jpg"),},
      ]);
    

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const usersPerPage = 4;

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setEditUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Người dùng </h3>
      
      <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <UserTableBody
        currentUsers={currentUsers}
        editUser={editUser}
        setEditUser={setEditUser}
        handleEditUser={handleEditUser}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default UserTable;
