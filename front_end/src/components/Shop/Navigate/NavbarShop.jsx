import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import styles from "../../../assets/style/components/ShopPage/navbarshop.module.css";
const NavbarShop = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/shop/dashboard" className={styles.link}>
            Quản lý cửa hàng
        </Link>
      </div>
      {/* User Actions */}
      <div className={styles.userActions}>
        <Link to="/shop/profile" className={styles.icon}>
          <FaUserCircle size={24} />
        </Link>
        <Link to="/shop/settings" className={styles.icon}>
          <FaCog size={24} />
        </Link>
        <Link to="/login" className={styles.icon}>
          <FaSignOutAlt size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarShop;
