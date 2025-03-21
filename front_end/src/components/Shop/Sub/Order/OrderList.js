import React from "react";
import { Table, Button , Pagination} from "react-bootstrap";

const OrderList = ({ orders, onView, onDelete, onCancel, onShip, onComplete }) => {
  return (
    <Table striped bordered hover>
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
            <td>{order.total.toLocaleString()} đ</td>
            <td>{order.status}</td>
            <td>
              <Button variant="info" size="sm" onClick={() => onView(order)}>
                Xem
              </Button>{" "}
              {order.status === "Đang xử lý" && (
                <Button variant="primary" size="sm" onClick={() => onShip(order.id)}>
                  Tiến hành giao hàng
                </Button>
              )}{" "}
              {order.status === "Đang vận chuyển" && (
                <Button variant="success" size="sm" onClick={() => onComplete(order.id)}>
                  Xác nhận hoàn thành
                </Button>
              )}{" "}
              {order.status !== "Đã hủy" && order.status !== "Hoàn thành" && (
                <Button variant="warning" size="sm" onClick={() => onCancel(order.id)}>
                  Hủy đơn
                </Button>
              )}{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(order.id)}>
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderList;
