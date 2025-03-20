import React, { useState, useEffect, useRef }  from "react";
import { Row, Col, Button, } from "react-bootstrap";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import {  useNavigate} from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import styles from "../assets/style/pages/cart_page.css";
const products = [
    { id: 1, name: "Áo Thun Nam", price: "299.000Đ",  img: require("../assets/image/item/item_5.jpg"), quanlity : 2, size: 36, color : "red"},
    { id: 2, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg") , quanlity : 1, size: 38, color : "white"},
    { id: 3, name: "Áo Khoác", price: "799.000Đ", img: require("../assets/image/item/item_2.jpg") ,  quanlity : 5 , size:40, color : "white"},
    { id: 4, name: "Giày Sneaker", price: "999.000Đ", img: require("../assets/image/item/item_3.jpg"), quanlity : 3, size : 39, color : "blue"},
    { id: 5, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 6, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 7, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 8, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 9, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 10, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 11, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 12, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
];
const newProducts = [
    { id: 1, name: "Áo Thun Nam", price: "299.000Đ",  img: require("../assets/image/item/item_5.jpg"), quanlity : 2, size: 36, color : "red"},
    { id: 2, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg") , quanlity : 1, size: 38, color : "white"},
    { id: 3, name: "Áo Khoác", price: "799.000Đ", img: require("../assets/image/item/item_2.jpg") ,  quanlity : 5 , size:40, color : "white"},
    { id: 4, name: "Giày Sneaker", price: "999.000Đ", img: require("../assets/image/item/item_3.jpg"), quanlity : 3, size : 39, color : "blue"},
    { id: 5, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 6, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 7, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 8, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 9, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
    { id: 10, name: "Quần Jeans", price: "499.000Đ", img: require("../assets/image/item/item_1.jpg")  , quanlity: 4, size : 38, color : "black"},
    { id: 11, name: "Áo Thun Nam", price: "299.000Đ",img: require("../assets/image/item/item_4.jpg")  , quanlity: 6 , size : 36, color : "green"},
];
const CartPage = () => {  
     const navigate = useNavigate(); 
    
      const handleBackToHome = () => {
        navigate("/"); 
      };
      const handleToCart = () => {
        navigate("/store"); 
      };  

      {/* Scroll Ngang*/}
      const scrollRef = useRef(null);
      const scrollLeft = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft -= 400;
            }
        };
      const scrollRight = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += 400;
            }
        };

    return (
        <div className="cart_container">
            <Row className="my-5 header_row justify-content-around">
                <Col className = "d-flex justify-content-start align-items-center">
                    <button className="btn_back" onClick={handleToCart}> <GoArrowLeft /></button>
                </Col>
                <Col>
                    <h1 className="text-center mb-3"><BsCart3/> Giỏ hàng</h1>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                    <button variant="primary" className="btn_back" onClick={handleBackToHome}> <GoArrowRight /></button>
                </Col>
            </Row>
         
            <Row className="d-flex justify-content-between">
               
                <Col className="md-8 table_product">
                    <div className="title_cart">
                         <h3 className="text-center">Danh sách giỏ hàng ⭣</h3> 
                    </div>
                    {products.map((product) => (
                        <Row key={product.id} className="d-flex justify-content-between mt-4 product_item">
                            <Col className ="d-flex justify-content-between align-items-center">
                                <Row>
                                    <Button variant="danger" className="btn_delete mt-2"><AiTwotoneDelete/></Button>
                                    <h3 className="text-left mt-5">{product.name}</h3>
                                    <p><strong>Giá : {product.price}</strong></p>
                                    <p><strong>Size : {product.size}</strong></p>
                                    <p><strong>Color : {product.color}</strong></p>
                                    <p><strong>Số lượng : </strong></p>
                                    <Row className="mb-3"> 
                                        <Col className="d-flex align-items-center justify-content-center"> 
                                            <Button variant="" className="btn_calculate"><CgMathMinus/></Button>
                                        </Col>
                                        <Col className="d-flex align-items-center justify-content-center"> 
                                            <h4>{product.quanlity}</h4>
                                        </Col>
                                        <Col className="d-flex align-items-center justify-content-center"> 
                                            <Button variant="" className="btn_calculate"><CgMathPlus /></Button>
                                        </Col>                                   
                                    </Row>
                                </Row>
                             </Col>
                             <Col className="d-flex align-items-center justify-content-end">
                                <img src={product.img} alt={product.name}  className="img_cart" />
                            </Col>
                        </Row>
                      
                    ))}
                </Col>

                <Col className="md-4 mt-4 ml-4 table_cart ">
                    <Row className="order-summary">
                        <h3 className="text-center">Tổng hợp đơn hàng</h3>
                    </Row>
                    <Row className="order-summary"> 
                    <Row>
                      <Col className="d-flex align-items-center justify-content-start">
                        <p><strong>Tổng Tiền</strong></p>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-end">
                        <p><strong>2.573.000Đ</strong></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex align-items-center justify-content-start">
                        <p><strong>Phí Vận Chuyển</strong></p>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-end">
                        <p><strong>Miễn phí</strong></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex align-items-center justify-content-start">
                        <p><strong>Thuế</strong></p>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-end">
                        <p><strong>60.000Đ</strong></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex align-items-center justify-content-start">
                        <p><strong>Mã Khuyến Mại</strong></p>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-end">
                        <p><strong>10%</strong></p>
                      </Col>
                    </Row>
                    </Row>
                    <Row className="order-summary">
                        <Button className="text-center btn_order" variant="">Đặt hàng</Button>
                    </Row>
                </Col>
            </Row>
            <hr/>

            <Row className="mt-5">
                   <img src={require("../assets/image/banner/banner_6.jpg")}/>
            </Row>

             <Row className="mt-5 newArrival position-relative">
            <h1>Sản phẩm mới</h1>
            <Button className="scroll-btn left" variant=""onClick={scrollLeft}>
                <GoArrowLeft />
            </Button>
            <div ref={scrollRef} className="d-flex overflow-auto newArrival-container">
                {newProducts.map((product) => (
                    <Col key={product.id} xs={12} md={6} lg={4} className="mb-4 flex-shrink-0 newArrivalItem " style={{ minWidth: "300px" }}>
                        <div>
                            <img src={product.img} alt={product.name} className="img-fluid mb-3 fixed_img" />
                            <h3 className="text-center">{product.name}</h3>
                            <p className="text-danger fw-bold text-center">{product.price}</p>
                            <Button className="w-100" variant="">Xem Chi Tiết</Button>
                        </div>
                    </Col>
                ))}
            </div>
            <Button className="scroll-btn right" variant="" onClick={scrollRight}>
                <GoArrowRight />
            </Button>
        </Row>
        </div>
    );
};

export default CartPage;