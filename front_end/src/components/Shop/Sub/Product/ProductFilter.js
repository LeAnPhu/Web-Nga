import React from "react";
import { Form } from "react-bootstrap";

const ProductFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="">Tất cả</option>
      <option value="Còn hàng">Còn hàng</option>
      <option value="Hết hàng">Hết hàng</option>
    </Form.Select>
  );
};

export default ProductFilter;
