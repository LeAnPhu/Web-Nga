import React, { useState } from "react";
import { Container, Row, Col, Form, Button,Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "../assets/style/pages/forgot_password.module.css";

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
  
    if (!email) {
      toast.error("Vui lòng nhập email!");
      return;
    }
  
    try {
      setLoading(true);
  
      const result = await dispatch(forgotPassword(email));
  
      if (result) {
        toast.success("Mã OTP đã được gửi, vui lòng kiểm tra email.");
        console.log("Sending to verify:", result);
        
        navigate("/verify", {
          state: {
            email: result.email,
            role: result.role,
          },
        });
      } else {
        toast.error("Không thể gửi OTP, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi gửi OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className={styles.forgot_container}  style={{ backgroundImage: 'url("/images/background.jpg")' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.forgot_wrapper}>
          <Col className="text-center">
            <h2 className={styles.title}>Quên Mật Khẩu</h2>
            <p>Nhập email để nhận mã OTP.</p>

            <Form onSubmit={handleSendOtp} className="d-flex flex-column align-items-center">
              <Form.Group className={`${styles.input_group} mt-3`}>
                <FaEnvelope className={styles.icon} />
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className={styles.submit_btn} disabled={loading}>
              {loading ? (
                <>
                    <Spinner animation="border" size="sm" /> Đang gửi...
                </>
                ) : (   
                "Gửi OTP"
                )}
              </Button>
              <Button onClick={() => navigate("/login")} className={styles.btn_style}>Quay lại</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
