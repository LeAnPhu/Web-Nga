import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import styles from "../../../assets/style/components/AdminPage/navbar.module.css";

const NavbarAdmin = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/admin/dashboard" className={styles.link}>
            Quản trị viên 
        </Link>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Tìm kiếm..." className={styles.searchInput} />
      </div>

      {/* User Actions */}
      <div className={styles.userActions}>
        <Link to="/admin/profile" className={styles.icon}>
          <FaUserCircle size={24} />
        </Link>
        <Link to="/admin/settings" className={styles.icon}>
          <FaCog size={24} />
        </Link>
        <Link to="/logout" className={styles.icon}>
          <FaSignOutAlt size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
