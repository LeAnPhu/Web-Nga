import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const WishToast = ({ show, message, onClose }) => {
  return (
    <ToastContainer className="position-fixed p-3" style={{ top: 20, right: 20, zIndex: 1050 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Wishlist</strong>
          <small>Hiện tại</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default WishToast;
