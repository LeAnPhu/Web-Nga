import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { CouponList, CouponFilter, CouponAction, CouponForm,NavbarShop, SideBarShop } from "../../components";
import styles from "../../assets/style/pages/Shop/manageCoupon.module.css";
const initialCoupons = [
  { id: 1, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 2, code: "SUMMER30", discount: 30, status: "Hết hạn" },
];

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleAddCoupon = () => {
    setEditingCoupon(null);
    setShowForm(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleSaveCoupon = (coupon) => {
    setCoupons((prevCoupons) =>
      editingCoupon
        ? prevCoupons.map((c) => (c.id === coupon.id ? coupon : c))
        : [...prevCoupons, coupon]
    );
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const filteredCoupons = filterStatus
    ? coupons.filter((coupon) => coupon.status === filterStatus)
    : coupons;

  return (
     <div className={styles.container}>
    <SideBarShop />
    <NavbarShop />
    <Container>
      <Card className={styles.cardContainer}>
        <Row className="mb-3">
          <Col><CouponFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} /></Col>
          <Col className="text-end"><CouponAction onAdd={handleAddCoupon} /></Col>
        </Row>
        <CouponList coupons={filteredCoupons} onEdit={handleEditCoupon} onDelete={handleDeleteCoupon} />
      </Card>
      <CouponForm show={showForm} onClose={() => setShowForm(false)} onSave={handleSaveCoupon} editingCoupon={editingCoupon} />
    </Container>
  </div>
  );
};

export default ManageCoupon;
