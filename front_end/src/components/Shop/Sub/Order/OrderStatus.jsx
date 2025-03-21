import React from "react";
import { Badge } from "react-bootstrap";

const statusMapping = {
  "Đang xử lý": { color: "warning", label: "Đang xử lý" },
  "Đang vận chuyển": { color: "primary", label: "Đang vận chuyển" },
  "Hoàn thành": { color: "success", label: "Hoàn thành" },
  "Đã hủy": { color: "danger", label: "Đã hủy" },
};

const OrderStatus = ({ status }) => {
  const normalizedStatus = status.trim();
  const { color, label } = statusMapping[normalizedStatus] || { color: "secondary", label: "Không xác định" };

  return <Badge bg={color}>{label}</Badge>;
};

export default OrderStatus;
