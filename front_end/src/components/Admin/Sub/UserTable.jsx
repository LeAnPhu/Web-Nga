import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Badge, Pagination, Modal } from "react-bootstrap";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn Neymar", email: "van.a@gmail.com", status: "Hoạt động",img: require("../../../assets/image/user/user_1.jpg"), },
    { id: 2, name: "Trần Thị Mohamed", email: "thi.b@gmail.com", status: "Tạm khóa",img: require("../../../assets/image/user/user_2.jpg"), },
    { id: 3, name: "Lê Văn Ronaldo", email: "van.c@gmail.com", status: "Hoạt động", img: require("../../../assets/image/user/user_3.jpg"),},
    { id: 4, name: "Phạm Minh Foden", email: "minh.d@gmail.com", status: "Tạm khóa", img: require("../../../assets/image/user/user_4.jpg"),},
    { id: 5, name: "Võ Quốc E", email: "quoc.e@gmail.com", status: "Hoạt động", img: require("../../../assets/image/user/user_5.jpg"),},
    { id: 6, name: "Đỗ Thanh F", email: "thanh.f@gmail.com", status: "Hoạt động", img: require("../../../assets/image/user/user_6.jpg"),},
    { id: 7, name: "Ngô Hoàng G", email: "hoang.g@gmail.com", status: "Hoạt động", img: require("../../../assets/image/user/user_4.jpg"),},
    { id: 8, name: "Tạ Quang H", email: "quang.h@gmail.com", status: "Tạm khóa", img: require("../../../assets/image/user/user_3.jpg"),},
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", status: "Hoạt động" });
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const [showModal, setShowModal] = useState(false);

  // Lọc danh sách người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán chỉ mục phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Thêm người dùng mới
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", email: "", status: "Hoạt động" });
      setShowModal(false);
    }
  };

  // Cập nhật trạng thái chỉnh sửa
  const handleEditUser = (user) => {
    setEditUser(user);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setEditUser(null);
  };

  // Xóa người dùng
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Xây dựng phân trang nâng cao
  const renderPagination = () => {
    let items = [];

    items.push(<Pagination.First key="first" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />);
    items.push(<Pagination.Prev key="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />);

    if (currentPage > 2) {
      items.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>);
      if (currentPage > 3) items.push(<Pagination.Ellipsis key="startEllipsis" />);
    }

    for (let number = Math.max(1, currentPage - 1); number <= Math.min(totalPages, currentPage + 1); number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="endEllipsis" />);
      items.push(<Pagination.Item key={totalPages} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Pagination.Item>);
    }

    items.push(<Pagination.Next key="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />);
    items.push(<Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />);

    return <Pagination>{items}</Pagination>;
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Người dùng</h3>

      {/* Ô tìm kiếm */}
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </InputGroup>

      {/* Bảng người dùng */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img src={user.img} style={{ width: "200px", height: "200px", objectFit: "cover" }} />
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <Form.Control value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <Form.Control value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                ) : (
                  user.email
                )}
              </td>
              <td>
                <Badge bg={user.status === "Hoạt động" ? "success" : "danger"}>{user.status}</Badge>
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <Button variant="success" onClick={handleSaveEdit} size="sm">Lưu</Button>
                ) : (
                  <>
                    <Button variant="warning" onClick={() => handleEditUser(user)} size="sm">Sửa</Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(user.id)} size="sm">Xóa</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang nâng cao */}
      {renderPagination()}
    </div>
  );
};

export default UserTable;
