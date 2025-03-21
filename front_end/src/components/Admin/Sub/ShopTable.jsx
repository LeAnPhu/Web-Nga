import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Badge, Pagination, Modal } from "react-bootstrap";

const ShopTable = () => {
  const [shops, setShops] = useState([
    { id: 1, name: "Nike Store", email: "nike@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/balan.png"), },
    { id: 2, name: "Adidas Shop", email: "adidas@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/adidas.png"),},
    { id: 3, name: "Puma Outlet", email: "puma@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/nike.png"), },
    { id: 4, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/rick_owen.png"),},
    { id: 5, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/rick_owen.png"),},
    { id: 6, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/adidas.png"),},
    { id: 7, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/nike.png"),},
    { id: 8, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/balan.png"),},
    { id: 9, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/rick_owen.png"),},
    { id: 10, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/nike.png"),},
    { id: 11, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/nike.png"),},
    { id: 12, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/balan.png"),},
    { id: 13, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa",   img: require("../../../assets/image/logo_store/balan.png"),},
    { id: 14, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động",   img: require("../../../assets/image/logo_store/balan.png"),},
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editShop, setEditShop] = useState(null);
  const shopsPerPage = 4;

  // Xóa cửa hàng
  const handleDelete = (id) => {
    setShops(shops.filter((shop) => shop.id !== id));
  };

  // Cập nhật trạng thái chỉnh sửa
  const handleEditShop = (shop) => {
    setEditShop(shop);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setShops(shops.map((shop) => (shop.id === editShop.id ? editShop : shop)));
    setEditShop(null);
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Cửa hàng</h3>

      {/* Ô tìm kiếm */}
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </InputGroup>

      {/* Bảng cửa hàng */}
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

      {/* Phân trang */}
      <Pagination className="pagination">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default ShopTable;
