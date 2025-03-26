import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import styles from "../assets/style/pages/register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Mặc định là user
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu không khớp!");
      return;
    }
    setErrorMsg(""); // Nếu mật khẩu khớp, xóa thông báo lỗi

    // Gửi yêu cầu đăng ký tới Redux
    const result = await dispatch(register(email, password, role));
    
    // Nếu đăng ký thành công, chuyển hướng đến trang xác thực
    if (result?.success) {
      navigate("/verify", { state: { email } }); // Truyền email qua state
    }
  };

  return (
    <div className={styles.register_container} style={{ backgroundImage: 'url("/images/background.jpg")' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.register_wrapper}>
          {/* Phần hình ảnh giới thiệu */}
          <Col md={6} className={styles.welcome_section}>
            <h2>Chào Mừng Bạn 🎉</h2>
            <p>Bắt đầu hành trình của bạn ngay hôm nay!</p>
          </Col>

          {/* Phần form đăng ký */}
          <Col md={6} className={styles.register_section}>
            <h4 className="text-center mb-3">Đăng ký tài khoản</h4>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <p className="text-danger text-center">{error}</p>}
            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}

            {/* Form đăng ký */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className={styles.input_group}>
                <FaEnvelope className={styles.icon} />
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group className={styles.input_group}>
                <FaLock className={styles.icon} />
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className={styles.input_group}>
                <FaLock className={styles.icon} />
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Lựa chọn tài khoản */}
              <Form.Group className={styles.accountSelectContainer}>
                <FaUser className={styles.accountIcon} />
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} className={styles.formSelect}>
                  <option value="user">Người dùng</option>
                  <option value="shop">Chủ cửa hàng</option>
                </Form.Select>
              </Form.Group>

              {/* Nút Đăng ký */}
              <Button type="submit" className={`${styles.register_btn} w-100`}>
                Đăng ký
              </Button>
            </Form>

           
            <p className="text-center mt-3">
              <a href="/login" className={styles.login_link}>Đã có tài khoản? Đăng nhập ngay</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
