import React, { useState } from "react";
import { Container, Row, Col, Card, Carousel, Image, Tab, Tabs, Table } from "react-bootstrap";

// Import component
import { ProductCard, Category } from "../../components"; 

// Import hình ảnh
import banner1 from "../../assets/image/banner/banner_1.jpg";
import banner2 from "../../assets/image/banner/banner_2.jpg";
import banner3 from "../../assets/image/banner/banner_3.jpg";
import banner4 from "../../assets/image/banner/banner_4.jpg";

// Import video
import demoVideo from "../../assets/video/demo.mp4";

// Import hình ảnh sản phẩm
import item1 from "../../assets/image/item/item_1.jpg";
import item2 from "../../assets/image/item/item_2.jpg";
import item3 from "../../assets/image/item/item_3.jpg";
import item4 from "../../assets/image/item/item_4.jpg";
import item5 from "../../assets/image/item/item_5.jpg";

const HomePage = () => {
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Danh Mục Nổi Bật</h2>

      <Category />

      {/* Slider Banner */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <Image className="d-block w-100" src={banner1} alt="Slide 1" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={banner2} alt="Slide 2" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={banner3} alt="Slide 3" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={banner4} alt="Slide 4" fluid />
        </Carousel.Item>
      </Carousel>

      <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-20 mt-20" fill>
        <Tab eventKey="man_shirt" title="Áo Nam">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="longer-tab" title="Loooonger Tab"></Tab>
        <Tab eventKey="contact" title="Contact">
          Tab content for Contact
        </Tab>
      </Tabs>

      <Card className="mb-4 mt-4">
        <video autoPlay muted loop width="100%">
          <source src={demoVideo} type="video/mp4" />
        </video>
      </Card>

      {/* Danh sách sản phẩm */}
      <h2 className="text-center mb-4 mt-4">Sản Phẩm Mới Nhất</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={3} className="mb-4 d-flex flex-column">
            <ProductCard product={product} onShow={handleShow} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
