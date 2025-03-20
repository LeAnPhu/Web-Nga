import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination } from "react-bootstrap";

const ProductTable = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Áo Thun Nam", price: "299.000đ",  img: require("../../../assets/image/item/item_5.jpg") },
    { id: 2, name: "Quần Jeans", price: "499.000đ", img: require("../../../assets/image/item/item_1.jpg") },
    { id: 3, name: "Áo Khoác", price: "799.000đ", img: require("../../../assets/image/item/item_2.jpg")  },
    { id: 4, name: "Giày Sneaker", price: "999.000đ", img: require("../../../assets/image/item/item_3.jpg")  },
    { id: 5, name: "Áo Thun Nam", price: "299.000đ",img: require("../../../assets/image/item/item_4.jpg")  },
    { id: 6, name: "Quần Jeans", price: "499.000đ", img: require("../../../assets/image/item/item_1.jpg")  },
    { id: 7, name: "Áo Khoác", price: "799.000đ",img: require("../../../assets/image/item/item_5.jpg")  },
    { id: 8, name: "Giày Sneaker", price: "999.000đ", img: require("../../../assets/image/item/item_3.jpg") },
    { id: 9, name: "Áo Thun Nam", price: "299.000đ", img: require("../../../assets/image/item/item_2.jpg")  },
    { id: 10, name: "Quần Jeans", price: "499.000đ", img: require("../../../assets/image/item/item_4.jpg")  },
    { id: 11, name: "Áo Khoác", price: "799.000đ",img: require("../../../assets/image/item/item_2.jpg")  },
    { id: 12, name: "Giày Sneaker", price: "999.000đ", img: require("../../../assets/image/item/item_1.jpg")  },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const productsPerPage = 5;

  // Xóa sản phẩm
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Cập nhật trạng thái chỉnh sửa
  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setProducts(products.map((product) => (product.id === editProduct.id ? editProduct : product)));
    setEditProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Sản Phẩm</h3>

      {/* Ô tìm kiếm */}
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button>Thêm sản phẩm mới +</Button>
      </InputGroup>

      {/* Bảng sản phẩm */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá bán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.img} alt={product.name} style={{ width: "200px", height: "300px", }} />
              </td>
              <td className="text-center">
                {editProduct?.id === product.id ? (
                  <Form.Control value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editProduct?.id === product.id ? (
                  <Form.Control value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editProduct?.id === product.id ? (
                  <Button variant="success" onClick={handleSaveEdit} size="sm">Lưu</Button>
                ) : (
                  <>
                    <Button variant="warning" onClick={() => handleEditProduct(product)} size="sm">Sửa</Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(product.id)} size="sm">Xóa</Button>
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

export default ProductTable;
