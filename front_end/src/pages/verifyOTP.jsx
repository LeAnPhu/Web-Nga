import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../redux/actions/authActions";
import { FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/style/pages/verify.module.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, otpExpired } = useSelector((state) => state.auth);

  // Nhận email và role từ trang đăng ký
  const email = location.state?.email || "";
  const role = location.state?.role || "user"; 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: "OTP_EXPIRED" });
    }
  }, [timeLeft, dispatch]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value) || otpExpired) return;
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
    if (otpExpired) return;

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Mã OTP phải có 6 chữ số!");
      return;
    }

    // Post len Api trong authActionauthAction
    const result = await dispatch(verifyOtp(email, otpValue, role));

    if (result.success) {
      toast.success("Xác thực OTP thành công! Đang chuyển hướng...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500); 
    }
  };

  const handleResendOTP = () => {
    dispatch(resendOtp(email, role));
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(120);
    toast.info("Đã gửi lại OTP, vui lòng kiểm tra email.", {
      position: "top-center",
      autoClose: 2000,
    });
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
                    disabled={otpExpired}
                  />
                ))}
              </div>

              {error && <p className="text-danger text-center">{error}</p>}
              {otpExpired ? (
                <p className={styles.otp_expired}>Mã OTP đã hết hạn, vui lòng gửi lại.</p>
              ) : (
                <p className={styles.countdown}>Mã OTP hết hạn sau: <b>{timeLeft}s</b></p>
              )}

              <Button type="submit" className={`${styles.verify_btn} w-50 mt-3`} disabled={otpExpired}>
                Xác nhận
              </Button>
            </Form>

            <Button onClick={handleResendOTP} className={`${styles.btn_style} w-30 mt-3`}>
              Gửi lại OTP
            </Button>

            <Button onClick={() => navigate("/login")} className={`${styles.btn_style} w-30 mt-3`}>
              Quay lại
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyOTP;
