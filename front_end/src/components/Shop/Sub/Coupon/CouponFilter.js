import React from "react";
import { Form } from "react-bootstrap";

const CouponFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="">Tất cả trạng thái</option>
      <option value="Hoạt động">Hoạt động</option>
      <option value="Hết hạn">Hết hạn</option>
    </Form.Select>
  );
};

export default CouponFilter;
