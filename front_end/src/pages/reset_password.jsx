import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/actions/authActions";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "../assets/style/pages/reset_password.module.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    const result = await dispatch(
      resetPassword({ email, password, confirmPassword, role: "user" })
    );
    setLoading(false);

    if (result) {
      toast.success("Mật khẩu đã được đặt lại thành công!");
      navigate("/login");
    }
  };

  return (
    <div
      className={styles.reset_container}
      style={{ backgroundImage: 'url("/images/background.jpg")' }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.reset_wrapper}>
          <Col md={12} className="text-center">
            <h2 className={styles.title}>Đặt Lại Mật Khẩu</h2>
          </Col>

          <Col md={12}>
            <Form
              onSubmit={handleResetPassword}
              className="d-flex flex-column align-items-center"
            >
              {/* Password */}
              <Form.Group className={`${styles.input_group} mt-4 position-relative`}>
                <FaLock className={styles.icon} />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className={`${styles.eye_icon}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className={`${styles.input_group} mt-4 position-relative`}>
                <FaLock className={styles.icon} />
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className={`${styles.eye_icon}`}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                className={styles.submit_btn}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Đặt lại mật khẩu"}
              </Button>

              <Button
                onClick={() => navigate("/login")}
                className={styles.btn_style}
                disabled={loading}
              >
                Quay lại
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
