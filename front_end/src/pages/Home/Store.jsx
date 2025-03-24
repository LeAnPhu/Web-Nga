import React from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoStorefrontOutline } from "react-icons/io5";
import {  useNavigate, Link  } from "react-router-dom";
import styles from "../../assets/style/pages/store.css";

const stores = [
  {
    id: 1,
    name: "Balenciaga Store",
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

const Store = () => {
  const navigate = useNavigate(); 

  const handleBackToHome = () => {
    navigate("/"); 
  };
  const handleToCart = () => {
    navigate("/cart"); 
  };
  return (
    <div className="container_store">
      <Row className="my-5 header_row justify-content-around">
        <Col className = "d-flex justify-content-start align-items-center">
          <button className="btn_back" onClick={handleBackToHome}> <GoArrowLeft /></button> 
        </Col>
        <Col>
        <h1 className="text-center mb-3"><IoStorefrontOutline/> Store</h1>
        <h2 className="text-center mb-5">Tìm kiếm chi tiết tại các cửa hàng dưới đây</h2>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <button variant="primary" className="btn_back" onClick={handleToCart}> <GoArrowRight /></button>
        </Col>
      </Row>

      {/* Store List Section */}
      <Row>
        {stores.map((store) => (
          <Col key={store.id} xs={12} md={6} lg={4} className="mb-4">
            <div className="store-card border p-4 rounded">
              <img src={store.img} alt={store.name} className="img-fluid rounded mb-3" />
              <h4 className="text-center">{store.name}</h4>
              <p>{store.description}</p>
              <h5>Loại sản phẩm:</h5>
              <ul>
                {store.productTypes.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
              <h5>Sản phẩm nổi bật:</h5>
              <Row>
                {store.products.slice(0, 3).map((product, index) => (
                  <Col key={index} xs={4} className="mb-2">
                    <img src={product.img} alt={product.name} className="img-fluid" />
                    <p>{product.name}</p>
                  </Col>
                ))}
              </Row>
              <Button variant=""  className="mt-3 btn_visit"  onClick={() => navigate(`/store/${store.id}`)}>
                Tham Quan Cửa Hàng ⭢
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Store;
