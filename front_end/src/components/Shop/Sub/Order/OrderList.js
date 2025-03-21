import React from "react";
import OrderStatus from "./OrderStatus";
import { Table, Button } from "react-bootstrap";

const OrderList = ({ orders, onView, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.total.toLocaleString()} VND</td>
            <td><OrderStatus status={order.status} /></td>
            <td>
              <Button variant="info" size="sm" onClick={() => onView(order)}>Xem</Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(order.id)}>Xóa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderList;
