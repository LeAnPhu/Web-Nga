import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image , Button, Row ,Column} from "react-bootstrap";
import styles from "../../assets/style/components/header/header.module.css";
import { BsCart3 } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Location} from "..";
const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate(); 
  
    const handleToCart = () => {
      navigate("/cart"); 
    };
  return (
    <header className={`${styles.header} `}style={{ backgroundImage: 'url("/images/background.jpg")' }}>

      <Navbar expand="lg" className="container">

        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className={styles.logo}>
            N.G.A 
          </Navbar.Brand>

          {/* Menu */}
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto d-flex gap-4">
            <Nav.Link as={Link} to="/store" className={styles.navLink}>Cửa hàng</Nav.Link>
              <Nav.Link as={Link} to="/category/men" className={styles.navLink}>Nam</Nav.Link>
              <Nav.Link as={Link} to="/category/women" className={styles.navLink}>Nữ</Nav.Link>
              <Nav.Link as={Link} to="/category/kids" className={styles.navLink}>Trẻ Em</Nav.Link>
              <Nav.Link as={Link} to="/sale-off" className={styles.navLink}>Sale</Nav.Link>
              <Nav.Link as={Link} to="/featured-products" className={styles.navLink}>Sản phẩm nổi bật</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Giỏ hàng */}
            <Button className={styles.btn_cart} onClick={handleToCart}><BsCart3 className={styles.cart}/></Button>

          {/* Avatar */}
            <div className = {styles.avatar}>
            <Image src ={require("../../assets/image/avatar.jpg")}></Image>
          </div>
        </Container>
      </Navbar>
      <div className={`text-center mt-2 ${styles.infoBar}`}>
        <Location /> <span className="ms-2">{currentTime.toLocaleString()}</span>
      </div>


      <Container className="mt-5">
        <Row>
          <h1 className ={styles.text_intro}>Sàn thời trang mới nhất 2025</h1>
        </Row>
        <Row>
        <h2 className ={styles.sub_intro}>Khám phá thêm các cửa hàng và danh mục thời trang <br/>bạn yêu thích</h2>
        <h2 className ={styles.sub_intro}>Hot sales cập nhật liên tục</h2>
        </Row>
        <Button variant="primary" className ={styles.btn_intro}>Khám phá ➤</Button>
      </Container>
    </header>
  );
};

export default Header;
