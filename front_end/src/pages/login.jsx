import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import styles from "../assets/style/pages/login.module.css";

const Login = () => {
  return (
    <div className={styles.login_container} style={{ backgroundImage: 'url("/images/background.jpg")' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.login_wrapper}>
          {/* Cột bên trái - Welcome */}
          <Col md={6} className={styles.welcome_section}>
            <Row>
                <h2>Chào Mừng Đến Với Website 🎆</h2>
                <p>Khám phá thời trang theo cách của bạn 👉</p>
            </Row>
            <Row>
                <Image src="/images/img_login.jpg" alt="Ảnh đăng nhập" />
            </Row>
            
          </Col>

          {/* Cột bên phải - Form đăng nhập */}
          <Col md={6} className={styles.login_section}>
            <h4 className="mb-3 text-center">
              Xin Chào! <span className={styles.greeting}>Cùng trải nghiệm nào</span>
            </h4>
            <h5 className={`${styles.login_title} text-center`} >Đăng nhập tài khoản!</h5>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Email" className={styles.input_field} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Mật khẩu" className={styles.input_field} required />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label="Nhớ mật khẩu" />
                <a href="/forgot-password" className={styles.forgot_password}>Quên mật khẩu?</a>
              </div>

              <Button type="submit" className={styles.login_btn} block>
                Đăng nhập
              </Button>
            </Form>

            <p className="text-center mt-3">
              <a href="/register" className={styles.create_account}>Tại tài khoản mới</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
