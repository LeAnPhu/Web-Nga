import React from "react";
import { Modal, Button } from "react-bootstrap";

const CouponDetail = ({ show, coupon, onClose }) => {
  if (!coupon) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Mã Giảm Giá: {coupon.code}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Giảm giá:</strong> {coupon.discount}%</p>
        <p><strong>Trạng thái:</strong> {coupon.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponDetail;
