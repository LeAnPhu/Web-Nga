import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "../assets/style/pages/login.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(email, password));
  
    console.log("Kết quả trả về từ API:", result);
    if (result && result.role) {
      const role = result.role;
      console.log("Role sau đăng nhập:", role);
      console.log("Email" , email);
      if (role === "admin") {
        console.log("Chuyển hướng đến /admin");
        navigate("/admin");
      } else if (role === "shop_owner") {
        console.log("Chuyển hướng đến /shop");
        navigate("/shop");
      } else {
        console.log("Chuyển hướng đến /");
        navigate("/");
      }
    } else {
      console.log("Lỗi đăng nhập hoặc thiếu data");
    }
  };

  const redirect = () => 
  {
    navigate("/register");
  }
  
  return (
    <div className={styles.login_container} style={{ backgroundImage: 'url("/images/background.jpg")' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.login_wrapper}>
          <Col md={6} className={styles.welcome_section}>
            <h2>Chào Mừng Đến Với Website 🎆</h2>
            <p>Khám phá thời trang theo cách của bạn 👉</p>
            <Image src="/images/img_login.jpg" alt="Ảnh đăng nhập" />
          </Col>
          <Col md={6} className={styles.login_section}>
            <h4 className="mb-3 text-center">
              Xin Chào! <span className={styles.greeting}>Cùng trải nghiệm nào</span>
            </h4>
            <h5 className={`${styles.login_title} text-center`}>Đăng nhập tài khoản!</h5>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className={`${styles.input_group} mb-3`}>
                   <FaEnvelope className={styles.icon} />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className={`${styles.input_group} mb-3`}>
                   <FaLock className={styles.icon} />
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label="Nhớ mật khẩu" />
                <a href="/forgot-password" className={styles.forgot_password}>Quên mật khẩu?</a>
              </div>
              <Button type="submit" className={`${styles.login_btn} w-100`}>
                Đăng nhập
              </Button>

            </Form>
            
            <Button onClick={redirect}className={`${styles.login_btn} w-100 mt-2`}>
                  Tạo tài khoản
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
