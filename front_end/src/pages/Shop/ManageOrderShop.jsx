import React, { useState } from "react";
import { NavbarShop, SideBarShop } from "../../components/index";
import { Card, Container, Row, Col } from "react-bootstrap";
import { OrderList, OrderFilter, OrderDetail} from "../../components";
import styles from "../../assets/style/pages/Shop/order.module.css";
const initialOrders = [
  { id: 1, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 2, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 3, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 4, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 5, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 6, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 7, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 8, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 9, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 10, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 11, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 12, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 13, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 14, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 15, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 16, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 17, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 18, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
  { id: 19, customer: "John Doe", total: 100000, status: "Đang xử lý" },
  { id: 20, customer: "Jane Smith", total: 250000, status: "Hoàn thành" },
  { id: 21, customer: "Alice Brown", total: 180000, status: "Đang vận chuyển" },
];

const ManageOrderShop = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");


  // Xem chi tiết đơn hàng
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Xóa đơn hàng
  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Hủy đơn hàng
  const handleCancelOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Đã hủy" } : order
      )
    );
  };

  // Tiến hành giao hàng
  const handleShipOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Đang vận chuyển" } : order
      )
    );
  };

  // Xác nhận hoàn thành đơn hàng
  const handleCompleteOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Hoàn thành" } : order
      )
    );
  };

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  return (
    <div>
      <NavbarShop />
        <div style={{ display: "flex" }} >
            <SideBarShop />
            <div style={{ marginLeft: "250px", marginTop:'70px',padding: "50px", width: "100%" }}>
              <h1 className="text-center">Đơn hàng</h1>
              <Container >
                <Card className="p-3">
                  <Row className="mb-3">
                    <Col>
                      <OrderFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
                    </Col>
                  </Row>
                  <OrderList
                    orders={filteredOrders}
                    onView={handleViewOrder}
                    onDelete={handleDeleteOrder}
                    onCancel={handleCancelOrder}
                    onShip={handleShipOrder}
                    onComplete={handleCompleteOrder}
                  />
                </Card>
              </Container>
          </div>
        </div>
      <OrderDetail show={!!selectedOrder} order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default ManageOrderShop;
