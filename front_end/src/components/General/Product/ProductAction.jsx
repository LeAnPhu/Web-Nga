import React from "react";
import { Button } from "react-bootstrap";

const ProductAction = ({ onAdd }) => {
  return <Button variant="primary" onClick={onAdd}>Thêm sản phẩm</Button>;
};

export default ProductAction;
