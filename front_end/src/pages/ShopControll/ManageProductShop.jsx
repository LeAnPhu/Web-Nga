import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { NavbarShop, SideBarShop, Search, PaginationComponent } from "../../components";
import ProductList from "../../components/General/Product/ProductList";
import ProductAction from "../../components/General/Product/ProductAction";
import ProductForm from "../../components/General/Product/ProductForm";

import item1 from "../../assets/image/item/item_1.jpg";
import item2 from "../../assets/image/item/item_2.jpg";
import item3 from "../../assets/image/item/item_3.jpg";
import item4 from "../../assets/image/item/item_4.jpg";
import item5 from "../../assets/image/item/item_5.jpg";

const initialProducts = [
  { id: 1, name: "Áo thun", category: "Áo Nam", price: 200000, img: item1, status: "Còn hàng", rating: 4.5 },
  { id: 2, name: "Quần jeans", category: "Quần Nam", price: 350000, img: item2, status: "Hết hàng", rating: 3.8 },
  { id: 3, name: "Áo sơ mi", category: "Áo Nam", price: 300000, img: item3, status: "Còn hàng", rating: 4.2 },
  { id: 4, name: "Váy nữ", category: "Váy", price: 450000, img: item4, status: "Còn hàng", rating: 4.7 },
  { id: 5, name: "Áo khoác", category: "Áo Nam", price: 600000, img: item5, status: "Hết hàng", rating: 4.0 },
];

const ManageProductShop = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 3;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProducts, totalPages]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSaveProduct = (product) => {
    const updatedProducts = editingProduct
      ? products.map((p) => (p.id === product.id ? product : p))
      : [...products, { ...product, id: products.length + 1 }];

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  };

  const handleSearch = ({ query, category, status, minPrice, maxPrice }) => {
    const newFilteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query.toLowerCase()) &&
        (!category || product.category === category) &&
        (!status || product.status === status) &&
        (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice))
      );
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <NavbarShop />
      <div style={{ display: "flex" }}>
        <SideBarShop />
        <div style={{ marginLeft: "250px", marginTop: "70px", padding: "50px", width: "100%" }}>
          <h1 className="text-center">Sản Phẩm</h1>
          <Container>
            <Card className="p-3">
              <Row className="mb-3">
                <Col><Search onSearch={handleSearch} /></Col>
                <Col className="text-end"><ProductAction onAdd={handleAddProduct} /></Col>
              </Row>
              <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              {currentProducts.length > 0 ? (
                <ProductList products={currentProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
              ) : (
                <p className="text-center mt-4">Không có sản phẩm nào phù hợp.</p>
              )}
            </Card>
            <ProductForm show={showForm} onClose={() => setShowForm(false)} onSave={handleSaveProduct} editingProduct={editingProduct} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ManageProductShop;
