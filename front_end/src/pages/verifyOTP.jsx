import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import styles from "../assets/style/pages/verify.module.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [otpExpired, setOtpExpired] = useState(false); // OTP hết hạn?
  const [timeLeft, setTimeLeft] = useState(120); // Thời gian hết hạn (giả định 2 phút)
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setOtpExpired(true);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value) || otpExpired) return; // Chặn nhập nếu OTP hết hạn
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
    if (otpExpired) return; // Không gửi khi OTP đã hết hạn

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrorMsg("Mã OTP phải có 6 chữ số!");
      return;
    }

    setErrorMsg("");

    // Gửi OTP đến API
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: otpValue }),
    });

    const result = await response.json();

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.message || "OTP không hợp lệ!");
    }
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpExpired(false);
    setTimeLeft(120); // Đặt lại 2 phút
    setErrorMsg("");
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
            
            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
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
