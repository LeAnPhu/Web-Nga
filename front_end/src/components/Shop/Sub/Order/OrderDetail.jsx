import React from "react";
import { Modal, Button } from "react-bootstrap";

const OrderDetail = ({ show, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Khách hàng:</strong> {order.customer}</p>
        <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} đ</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetail;
