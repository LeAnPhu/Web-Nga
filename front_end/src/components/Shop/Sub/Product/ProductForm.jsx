import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductForm = ({ show, onClose, onSave, editingProduct }) => {
  const [product, setProduct] = useState({ id: "", name: "",category : "" , price: "", img: "", status: "Còn hàng", rating: 0 });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({ id: "", name: "",category : "" , price: "", img: "", status: "Còn hàng", rating: 0 });
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") { 
      onSave(product);
    } else {
      console.error("onSave is not a function"); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Danh Mục</Form.Label>
            <Form.Control
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
            {product.img && <img src={product.img} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              value={product.status}
              onChange={(e) => setProduct({ ...product, status: e.target.value })}
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Đánh giá</Form.Label>
            <Form.Control
              type="number"
              value={product.rating}
              onChange={(e) => setProduct({ ...product, rating: e.target.value })}
              min="0"
              max="5"
              step="0.5"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Lưu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
