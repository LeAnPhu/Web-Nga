import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import styles from '../assets/style/components/footer/footer.module.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <footer className="text-white py-4">
        <div className="container">
          <div className={`row justify-content-between ${styles.footer_content}`}>
            <div className="col-md-4 text-start">
              <h5>Về chúng tôi</h5>
              <p><strong>Vua Vành Đai</strong>.</p>
            </div>
            <div className="col-md-4 text-center">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
              <li className="mx-3">
            <Link to="/" className={styles.navLink}>
              Trang chủ
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/about" className={styles.navLink}>
              Giới thiệu
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/contact" className={styles.navLink}>
              Liên hệ
            </Link>
          </li>
              </ul>
            </div>
            <div className="col-md-4 text-end">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white"><i className="bi bi-facebook"></i> Facebook</a></li>
                <li><a href="#" className="text-white"><i className="bi bi-twitter"></i> Twitter</a></li>
                <li><a href="#" className="text-white"><i className="bi bi-instagram"></i> Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-3">
          <marquee behavior="scroll" direction="left"><p> <b>© 2025 An Le Website. All rights reserved.</b></p></marquee>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
