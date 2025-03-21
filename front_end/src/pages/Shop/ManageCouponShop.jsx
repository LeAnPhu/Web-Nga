import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { CouponList, CouponFilter, CouponAction, CouponForm,NavbarShop, SideBarShop } from "../../components";
import styles from "../../assets/style/pages/Shop/manageCoupon.module.css";
const initialCoupons = [
  { id: 1, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 2, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 3, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 4, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 5, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 6, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 7, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 8, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 9, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 10, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 11, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 12, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 13, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 14, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 15, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 16, code: "SUMMER30", discount: 30, status: "Hết hạn" },
  { id: 17, code: "SALE50", discount: 50, status: "Hoạt động" },
  { id: 18, code: "SUMMER30", discount: 30, status: "Hết hạn" },
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
      <NavbarShop />
      <div style={{ display: "flex" }}>
        <SideBarShop />
            <div style={{ marginLeft: "250px",marginTop: "70px", padding: "50px", width: "100%" }}>
              <h1 className="text-center mb-4">Mã Giảm Giá</h1>
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
      </div>
  </div>
  );
};

export default ManageCoupon;
