import React from "react";
import { Table, Button, Badge, Form } from "react-bootstrap";

const ShopTableBody = ({ currentShops, editShop, setEditShop, handleEditShop, handleSaveEdit, handleDelete }) => {
  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Hình ảnh</th>
          <th>Tên cửa hàng</th>
          <th>Email</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {currentShops.map((shop) => (
          <tr key={shop.id}>
            <td>{shop.id}</td>
            <td>
              <img src={shop.img} alt={shop.name} style={{ width: "200px", height: "200px", objectFit: "cover" }} />
            </td>
            <td>
              {editShop?.id === shop.id ? (
                <Form.Control value={editShop.name} onChange={(e) => setEditShop({ ...editShop, name: e.target.value })} />
              ) : (
                shop.name
              )}
            </td>
            <td>
              {editShop?.id === shop.id ? (
                <Form.Control value={editShop.email} onChange={(e) => setEditShop({ ...editShop, email: e.target.value })} />
              ) : (
                shop.email
              )}
            </td>
            <td>
              <Badge bg={shop.status === "Hoạt động" ? "success" : "danger"}>{shop.status}</Badge>
            </td>
            <td>
              {editShop?.id === shop.id ? (
                <Button variant="success" onClick={handleSaveEdit} size="sm">Lưu</Button>
              ) : (
                <>
                  <Button variant="warning" onClick={() => handleEditShop(shop)} size="sm">Sửa</Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(shop.id)} size="sm">Xóa</Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ShopTableBody;
