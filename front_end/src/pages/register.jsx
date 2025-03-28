import React, { useState } from "react";
import { Container, Row, Col, Form, Button,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import styles from "../assets/style/pages/register.module.css";
import { FaChevronDown } from "react-icons/fa";
const Register = () => {

  const [loading, setLoading] = useState(false); 
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Role được chọn:", role);
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu không khớp!");
      return;
    }
    setErrorMsg(""); 

    setLoading(true);
    const result = await dispatch(register(name, email, password, role));
    
    if (result?.success) {
      navigate("/verify", { state: { email, role , from: "register"  } });
      setLoading(false);
    }
    else {
      setErrorMsg(result.error);
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
                  <FaUser className={styles.accountIcon} />
                  <Form.Control
                    type="name"
                    placeholder="Tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
              </Form.Group>
              
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
              <Form.Group 
                className={`${styles.accountSelectContainer} ${isSelectOpen ? styles.selectOpen : ""}`}
                onClick={() => setIsSelectOpen(!isSelectOpen)}  
              >
                <FaUser className={styles.accountIcon} />
                <Form.Select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="user">Người dùng</option>
                  <option value="shop_owner">Chủ cửa hàng</option>
                </Form.Select>
                <FaChevronDown className={styles.arrowIcon}/> 
              </Form.Group>


              {/* Nút Đăng ký */}
              <Button type="submit" className={`${styles.register_btn} w-100`}>
                {loading ? (
                      <>
                        <Spinner size="sm" animation="border" className="me-2" />
                                    Đang xác thực...
                        </>
                      ) : (
                            "Xác nhận"
                      )}
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
