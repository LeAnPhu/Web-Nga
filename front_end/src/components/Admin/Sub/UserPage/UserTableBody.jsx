import React from "react";
import { Table, Button, Badge, Form } from "react-bootstrap";

const UserTableBody = ({ currentUsers, editUser, setEditUser, handleEditUser, handleSaveEdit, handleDelete }) => {
  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Hình ảnh</th>
          <th>Tên người dùng</th>
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
              <img src={user.img} alt={user.name} style={{ width: "200px", height: "200px", objectFit: "cover" }} />
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
  );
};

export default UserTableBody;
