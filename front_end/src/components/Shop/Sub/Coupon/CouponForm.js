import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const CouponForm = ({ show, onClose, onSave, editingCoupon }) => {
  const [code, setCode] = useState(editingCoupon?.code || "");
  const [discount, setDiscount] = useState(editingCoupon?.discount || "");
  const [status, setStatus] = useState(editingCoupon?.status || "Hoạt động");

  const handleSubmit = () => {
    onSave({ id: editingCoupon?.id || Date.now(), code, discount, status });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingCoupon ? "Chỉnh Sửa" : "Thêm"} Mã Giảm Giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mã Giảm Giá</Form.Label>
            <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giảm Giá (%)</Form.Label>
            <Form.Control type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng Thái</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Hết hạn">Hết hạn</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Hủy</Button>
        <Button variant="primary" onClick={handleSubmit}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponForm;
