import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "../redux/actions/authActions";
import { FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/style/pages/verify.module.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false); 
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const role = location.state?.role ?? "user";
  const from = location.state?.from ?? "register"; 

  useEffect(() => {
    if (!email) {
      toast.error("Vui lòng nhập email trước!");
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Mã OTP phải có 6 chữ số!");
      return;
    }

    setLoading(true);
    const result = await dispatch(verifyOtp(email, otpValue, role));
    setLoading(false);

    if (result.success) {
      toast.success("Xác thực OTP thành công! Đang chuyển hướng...");
      setTimeout(() => {
        if (from === "forgot_password") {
          navigate("/reset-password", { state: { email, role } });
        } else {
          navigate("/login");
        }
      }, 2000);
    } else {
      toast.error("Mã OTP không hợp lệ hoặc đã hết hạn!");
    }
  };

  const handleResendOTP = () => {
    if (!email) return toast.error("Không thể gửi lại OTP vì thiếu email!");
    dispatch(resendOtp(email, role));
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    toast.info("Mã OTP mới đã được gửi!");
  };

  return (
    <div className={styles.verify_container} style={{ backgroundImage: 'url("/images/background.jpg")' }}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className={styles.verify_wrapper}>
          <Col md={12} className="text-center">
            <h2 className={styles.title}>
              Xác Thực OTP <FaKey className={styles.key_icon} />
            </h2>
            <p>Nhập mã OTP đã gửi đến email của bạn.</p>
          </Col>

          <Col md={12}>
            <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
              <div className={styles.otp_inputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    disabled={timeLeft === 0 || loading}
                  />
                ))}
              </div>

              <p className={styles.countdown}>
                {timeLeft > 0 ? `OTP hết hạn sau: ${timeLeft}s` : "Mã OTP đã hết hạn!"}
              </p>

              <Button type="submit" className={`${styles.verify_btn} w-50 mt-3`} disabled={timeLeft === 0 || loading}>
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

            <Button onClick={handleResendOTP} className={`${styles.btn_style} w-50 mt-3`} disabled={timeLeft > 0 || loading}>
              Gửi lại OTP
            </Button>

            <Button onClick={() => navigate("/login")} className={`${styles.btn_style} w-50 mt-3`} disabled={loading}>
              Quay lại
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyOTP;
