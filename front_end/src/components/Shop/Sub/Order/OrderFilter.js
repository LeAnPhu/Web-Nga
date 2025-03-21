import React from "react";
import { Form } from "react-bootstrap";

const OrderFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="">Tất cả trạng thái</option>
      <option value="Đang xử lý">Đang xử lý</option>
      <option value="Đang vận chuyển">Đang vận chuyển</option>
      <option value="Hoàn thành">Hoàn thành</option>
      <option value="Đã hủy">Đã hủy</option>
    </Form.Select>
  );
};

export default OrderFilter;
