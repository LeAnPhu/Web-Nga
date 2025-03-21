import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { ProductList, ProductFilter, ProductAction, ProductForm, NavbarShop, SideBarShop } from "../../components";

const initialProducts = [
  { id: 1, name: "Áo thun",category : "Áo Nam" , price: 200000, image: "", status: "Còn hàng", rating: 4.5 },
  { id: 2, name: "Quần jeans",category : "Áo Nam" , price: 350000, image: "", status: "Hết hàng", rating: 3.8 },
];

const ManageProduct = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 👉 Thêm sản phẩm
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // 👉 Sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ✅ Hàm Lưu sản phẩm (Fix lỗi onSave)
  const handleSaveProduct = (product) => {
    setProducts((prevProducts) =>
      editingProduct
        ? prevProducts.map((p) => (p.id === product.id ? product : p)) // Cập nhật sản phẩm
        : [...prevProducts, { ...product, id: prevProducts.length + 1 }] // Thêm sản phẩm mới
    );
    setShowForm(false);
  };

  // 👉 Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = filterStatus
    ? products.filter((product) => product.status === filterStatus)
    : products;

  return (
    <div>
      <NavbarShop/>
      <SideBarShop/>
      <div className="mt-5">
      <Container>
        <Card className="p-3">
          <Row className="mb-3">
            <Col><ProductFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} /></Col>
            <Col className="text-end"><ProductAction onAdd={handleAddProduct} /></Col>
          </Row>
          <ProductList products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </Card>
        {/* ✅ Fix lỗi: Truyền đúng hàm handleSaveProduct */}
        <ProductForm show={showForm} onClose={() => setShowForm(false)} onSave={handleSaveProduct} editingProduct={editingProduct} />
      </Container>
      </div>
    </div>
  );
};

export default ManageProduct;
