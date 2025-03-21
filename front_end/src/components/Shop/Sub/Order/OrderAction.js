import React from "react";
import { Button } from "react-bootstrap";

const OrderAction = ({ onAdd }) => {
  return (
    <Button variant="success" onClick={onAdd}>
      + Thêm đơn hàng
    </Button>
  );
};

export default OrderAction;
