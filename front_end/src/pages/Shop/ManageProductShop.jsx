import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { ProductList, ProductFilter, ProductAction, ProductForm, NavbarShop, SideBarShop } from "../../components";


import item1 from "../../assets/image/item/item_1.jpg";
import item2 from "../../assets/image/item/item_2.jpg";
import item3 from "../../assets/image/item/item_3.jpg";
import item4 from "../../assets/image/item/item_4.jpg";
import item5 from "../../assets/image/item/item_5.jpg";

const initialProducts = [
  { id: 1, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item1, status: "Còn hàng", rating: 4.5 },
  { id: 2, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item2, status: "Hết hàng", rating: 3.8 },
  { id: 3, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item3, status: "Còn hàng", rating: 4.5 },
  { id: 4, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item4, status: "Hết hàng", rating: 3.8 },
  { id: 5, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item5, status: "Còn hàng", rating: 4.5 },
  { id: 6, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item1, status: "Hết hàng", rating: 3.8 },
  { id: 7, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item2, status: "Còn hàng", rating: 4.5 },
  { id: 8, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item3, status: "Hết hàng", rating: 3.8 },
  { id: 9, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item4, status: "Còn hàng", rating: 4.5 },
  { id: 10, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item5, status: "Hết hàng", rating: 3.8 },
  { id: 11, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item1, status: "Còn hàng", rating: 4.5 },
  { id: 12, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item2, status: "Hết hàng", rating: 3.8 },
  { id: 13, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item3, status: "Còn hàng", rating: 4.5 },
  { id: 14, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item4, status: "Hết hàng", rating: 3.8 },
  { id: 15, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item5, status: "Còn hàng", rating: 4.5 },
  { id: 16, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item1, status: "Hết hàng", rating: 3.8 },
  { id: 17, name: "Áo thun",category : "Áo Nam" , price: 200000,  img: item5, status: "Còn hàng", rating: 4.5 },
  { id: 18, name: "Quần jeans",category : "Áo Nam" , price: 350000,  img: item4, status: "Hết hàng", rating: 3.8 },
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
      <div style={{ display: "flex" }} >
        <SideBarShop/>
          <div style={{ marginLeft: "250px", marginTop: "70px",padding: "50px", width: "100%" }}>
            <h1 className="text-center">Sản Phẩm</h1>
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
    </div>
  );
};

export default ManageProduct;
