import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaStar } from "react-icons/fa";
import styles from "../../assets/style/pages/store_detail.module.css"; // Import CSS module

// Dữ liệu mẫu
const storeInfo = {
  name: "Cửa hàng thời trang ABC",
  address: "123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
  phone: "0987 654 321",
  description:
    "Chuyên cung cấp quần áo thời trang cao cấp, đa dạng mẫu mã và giá cả hợp lý.",
  rating: 4.8,
};

// Sản phẩm nổi bật của cửa hàng
const featuredProducts = [
  { id: 1, name: "Áo sơ mi nam", price: "450.000đ", img: "/images/shirt.jpg" },
  { id: 2, name: "Quần jeans nữ", price: "650.000đ", img: "/images/jeans.jpg" },
  { id: 3, name: "Giày sneaker", price: "1.200.000đ", img: "/images/shoes.jpg" },
];

const StoreDetail = () => {
  return (
    <Container className={`mt-5 ${styles.storeContainer}`}>
      {/* Tiêu đề cửa hàng */}
      <Row className="mb-4 text-center">
        <Col>
          <h2 className={styles.storeTitle}>{storeInfo.name}</h2>
          <p className="text-muted">
            <FaMapMarkerAlt className="me-2 text-danger" />
            {storeInfo.address}
          </p>
          <p>
            <FaPhone className="me-2 text-success" /> {storeInfo.phone}
          </p>
          <p className="fw-light">{storeInfo.description}</p>
        </Col>
      </Row>

      {/* Bản đồ hoặc hình ảnh mô phỏng */}
      <Row className="mb-5">
        <Col className="text-center">
          <Image
            src="/images/store-map.jpg"
            alt="Bản đồ cửa hàng"
            className={`rounded shadow-lg ${styles.mapImage}`}
          />
        </Col>
      </Row>

      {/* Danh sách sản phẩm nổi bật */}
      <h3 className="mb-3 text-center">🛍️ Sản phẩm nổi bật</h3>
      <Row>
        {featuredProducts.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className={`shadow-sm ${styles.productCard}`}>
              <Card.Img variant="top" src={product.img} className={styles.productImage} />
              <Card.Body className="text-center">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="fw-bold text-danger">{product.price}</Card.Text>
                <Button variant="success">Mua ngay</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Đánh giá cửa hàng */}
      <Row className="mt-4 text-center">
        <Col>
          <h4>⭐ Đánh giá cửa hàng: {storeInfo.rating}/5</h4>
          <div>
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.floor(storeInfo.rating) ? (
                <FaStar key={i} color="gold" />
              ) : (
                <FaStar key={i} color="lightgray" />
              )
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetail;
