import {React, useRef }from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaStar } from "react-icons/fa";
import MapComponent from "../../components/General/Layout/MapComponent";
import styles from "../../assets/style/pages/store_detail.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ProductCard from "../../components/General/Product/ProductCard";
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
// Danh sách cửa hàng (có thể fetch từ API sau này)
const stores = [
  {
    id: 1,
    name: "Balenciaga Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating: 4.5,
    img: require("../../assets/image/logo_store/balan.png"),
    description: "Balenciaga is a luxury fashion brand known for its high-end clothing, accessories, and shoes.",
    productTypes: ["Clothing", "Shoes", "Accessories"],
    products: [
      { name: "Balenciaga Sneakers", img: require("../../assets/image/item/item_1.jpg") },
      { name: "Balenciaga Hoodie", img: require("../../assets/image/item/item_2.jpg") },
      { name: "Balenciaga Sunglasses", img: require("../../assets/image/item/item_3.jpg") }
    ]
  },
  {
    id: 2,
    name: "Nike Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating :4,
    img: require("../../assets/image/logo_store/nike.png"),
    description: "Nike is a globally recognized brand that specializes in sportswear, shoes, and athletic gear.",
    productTypes: ["Sportswear", "Shoes", "Accessories"],
    products: [
      { name: "Nike Air Max", img: require("../../assets/image/item/item_2.jpg") },
      { name: "Nike T-Shirt", img: require("../../assets/image/item/item_3.jpg") },
      { name: "Nike Backpack", img: require("../../assets/image/item/item_4.jpg") }
    ]
  },
  {
    id: 3,
    name: "Adidas Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating: 5,
    img: require("../../assets/image/logo_store/adidas.png"),
    description: "Adidas is a leading brand in sportswear and lifestyle products, famous for shoes, shirts, and accessories.",
    productTypes: ["Sportswear", "Shoes", "Accessories"],
    products: [
      { name: "Adidas Ultraboost", img: require("../../assets/image/item/item_1.jpg") },
      { name: "Adidas Tracksuit", img: require("../../assets/image/item/item_4.jpg") },
      { name: "Adidas Cap", img: require("../../assets/image/item/item_3.jpg") }
    ]
  },
  {
    id: 4,
    name: "Rick Owen Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating: 4,
    img: require("../../assets/image/logo_store/rick_owen.png"),
    description: "Adidas is a leading brand in sportswear and lifestyle products, famous for shoes, shirts, and accessories.",
    productTypes: ["Sportswear", "Shoes", "Accessories"],
    products: [
      { name: "Adidas Ultraboost", img: require("../../assets/image/item/item_1.jpg") },
      { name: "Adidas Tracksuit", img: require("../../assets/image/item/item_4.jpg") },
      { name: "Adidas Cap", img: require("../../assets/image/item/item_3.jpg") }
    ]
  },
  {
    id: 5,
    name: "Rick Owen Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating: 4,
    img: require("../../assets/image/logo_store/rick_owen.png"),
    description: "Adidas is a leading brand in sportswear and lifestyle products, famous for shoes, shirts, and accessories.",
    productTypes: ["Sportswear", "Shoes", "Accessories"],
    products: [
      { name: "Adidas Ultraboost", img: require("../../assets/image/item/item_1.jpg") },
      { name: "Adidas Tracksuit", img: require("../../assets/image/item/item_4.jpg") },
      { name: "Adidas Cap", img: require("../../assets/image/item/item_3.jpg") }
    ]
  },
  {
    id: 6,
    name: "Rick Owen Store",
    address:'Số 1 Đào Duy Anh , Đống Đa , Hà Nội',
    rating: 5,
    img: require("../../assets/image/logo_store/rick_owen.png"),
    description: "Adidas is a leading brand in sportswear and lifestyle products, famous for shoes, shirts, and accessories.",
    productTypes: ["Sportswear", "Shoes", "Accessories"],
    products: [
      { name: "Adidas Ultraboost", img: require("../../assets/image/item/item_1.jpg") },
      { name: "Adidas Tracksuit", img: require("../../assets/image/item/item_4.jpg") },
      { name: "Adidas Cap", img: require("../../assets/image/item/item_3.jpg") }
    ]
  },
];

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const store = stores.find((s) => s.id === parseInt(id));

  if (!store) {
    return <h2 className="text-center mt-5">Cửa hàng không tồn tại!</h2>;
  }

  const handleBackToHome = () => {
    navigate("/"); 
  };
  const handleToCart = () => {
    navigate("/cart"); 
  };

  
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

  return (
    <div className={`mt-5 ${styles.storeContainer}`}>
      <Row className="mb-4 text-center">
        <Row className="my-5 header_row justify-content-around">
           <Col className = "d-flex justify-content-start align-items-center">
                    <button className="btn_back" onClick={handleBackToHome}> <GoArrowLeft /></button> 
            </Col>
            <Col>
              <h2 className={styles.storeTitle}>{store.name}</h2>
            </Col>
          <Col className="d-flex justify-content-end align-items-center">
                    <button variant="primary" className="btn_back" onClick={handleToCart}> <GoArrowRight /></button>
          </Col>
          </Row>
          <p>
            <FaMapMarkerAlt className="me-2 text-danger" />
            {store.address}
          </p>
          <p>
            <FaPhone className="me-2 text-success" /> {store.phone}
          </p>
          <p className="fw-light">{store.description}</p>
     
      </Row>

      {/* Sản phẩm */}
      <h3 className="mb-5 text-center">🛍️ Sản phẩm nổi bật</h3>
      <Row>
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
      </Row>

      {/* Map */}
      <Row className="mb-5 mt-5">
        <Col className="text-center">
          <MapComponent storeLocation={store.location} />
        </Col>
      </Row>  

      {/* Đánh giá */}
      <Row className="mt-4 text-center">
        <Col>
          <h4>⭐ Đánh giá: {store.rating}/5</h4>
          <div>
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.floor(store.rating) ? (
                <FaStar key={i} color="gold" />
              ) : (
                <FaStar key={i} color="lightgray" />
              )
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StoreDetail;
