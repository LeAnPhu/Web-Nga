import React, { useState } from "react";
import { NavbarShop, SideBarShop } from "../../components/index";
import { Card, Container, Row, Col } from "react-bootstrap";
import { OrderList, OrderFilter, OrderDetail, OrderAction } from "../../components";



const initialOrders = [
  { id: 1, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 2, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 3, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
];

const ManageOrderShop = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  // Thêm đơn hàng
  const handleAddOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      customer: `Khách hàng ${orders.length + 1}`,
      total: Math.floor(Math.random() * 500000) + 50000,
      status: "Đang xử lý",
    };
    setOrders([...orders, newOrder]);
  };

  // Xem chi tiết đơn hàng
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Xóa đơn hàng
  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  return (
    <div>
      <NavbarShop />
      <div style={{ display: "flex" }}>
        <SideBarShop />
        <Container>
          <Card className="p-3">
            <h2 className="h4 fw-bold">Quản lý Đơn hàng</h2>
            <Row className="mb-3">
              <Col><OrderFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} /></Col>
              <Col className="text-end"><OrderAction onAdd={handleAddOrder} /></Col>
            </Row>
            <OrderList orders={filteredOrders} onView={handleViewOrder} onDelete={handleDeleteOrder} />
          </Card>
        </Container>
      </div>
      <OrderDetail show={!!selectedOrder} order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default ManageOrderShop;
