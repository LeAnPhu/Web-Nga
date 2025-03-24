import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ProductCard from "../../components/General/Product/ProductCard";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import styles from "../../assets/style/pages/product_page.module.css";
// Import hình ảnh sản phẩm
import item1 from "../../assets/image/item/item_1.jpg";
import item2 from "../../assets/image/item/item_2.jpg";
import item3 from "../../assets/image/item/item_3.jpg";
import item4 from "../../assets/image/item/item_4.jpg";
import item5 from "../../assets/image/item/item_5.jpg";

// Dữ liệu sản phẩm
const products = [
  { id: 1, name: "Áo Thun Nam", price: "299.000đ", img: item5 },
  { id: 2, name: "Quần Jeans", price: "499.000đ", img: item1 },
  { id: 3, name: "Áo Khoác", price: "799.000đ", img: item2 },
  { id: 4, name: "Giày Sneaker", price: "999.000đ", img: item3 },
  { id: 5, name: "Áo Thun Nam", price: "299.000đ", img: item4 },
  { id: 6, name: "Quần Jeans", price: "499.000đ", img: item1 },
  { id: 7, name: "Áo Khoác", price: "799.000đ", img: item5 },
  { id: 8, name: "Giày Sneaker", price: "999.000đ", img: item3 },
  { id: 9, name: "Áo Thun Nam", price: "299.000đ", img: item2 },
  { id: 10, name: "Quần Jeans", price: "499.000đ", img: item4 },
  { id: 11, name: "Áo Khoác", price: "799.000đ", img: item2 },
  { id: 12, name: "Giày Sneaker", price: "999.000đ", img: item1 },
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const [comments, setComments] = useState([
    { name: "Nguyễn Văn A", comment: "Sản phẩm rất đẹp, chất lượng tốt!" },
    { name: "Trần Thị B", comment: "Mình rất thích, sẽ mua thêm!" },
  ]);
  const [newComment, setNewComment] = useState("");

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="text-center text-danger mt-5">⚠️ Sản phẩm không tồn tại!</h2>;
  }

  // Đánh giá sao
  const rating = 4.5;
  const totalReviews = 23;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, { name: "Bạn", comment: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-5 mb-5 container-product">
      <Row className="my-5 header_row justify-content-around">
        <Col className="d-flex justify-content-start align-items-center">
          <button className="btn_back" onClick={() => navigate("/")}>
            <GoArrowLeft />
          </button>
        </Col>
        <Col>
          <h2 className="text-center mb-5">Sản phẩm Chi Tiết</h2>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <button className="btn_back" onClick={() => navigate("/cart")}>
            <GoArrowRight />
          </button>
        </Col>
      </Row>

      <Row>
        {/* Hình ảnh sản phẩm với hiệu ứng zoom */}
        <Col md={6}>
          <TransformWrapper>
            <TransformComponent>
              <Image src={product.img} alt={product.name} fluid className="rounded shadow" />
            </TransformComponent>
          </TransformWrapper>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col md={6}>
          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="text-danger fw-bold">{product.price}</h4>

          {/* Hiển thị đánh giá sao */}
          <div className="d-flex align-items-center mb-3">
            {Array.from({ length: 5 }, (_, index) => {
              if (index + 1 <= rating) return <FaStar key={index} color="gold" />;
              if (index + 0.5 === rating) return <FaStarHalfAlt key={index} color="gold" />;
              return <FaRegStar key={index} color="gold" />;
            })}
            <span className="ms-2 text-muted">({totalReviews} đánh giá)</span>
          </div>

          <Button variant="success" size="lg" onClick = {() => navigate("/cart")}>🛒 Thêm vào Giỏ hàng</Button>
        </Col>
      </Row>

      {/* Sản phẩm liên quan */}
      <h2 className="mt-5">🔗 Sản phẩm liên quan</h2>
      <div className={styles.container_scroll}>
        <Button className="scroll-btn left" variant="" onClick={scrollLeft}>
          <GoArrowLeft />
        </Button>

        <div className="product-list d-flex overflow-auto" ref={scrollRef} style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
          {products.map((product) => (
            <div key={product.id} style={{ flex: "0 0 auto", width: "350px", }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Button className="scroll-btn right" variant="" onClick={scrollRight}>
          <GoArrowRight />
        </Button>
      </div>

      {/* Bình luận */}
      <h3 className="mt-5">💬 Bình luận</h3>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Viết bình luận..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Gửi</Button>
          </Form>

          <div className="mt-3">
            {comments.map((c, index) => (
              <div key={index} className="mb-2">
                <strong>{c.name}:</strong> {c.comment}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
