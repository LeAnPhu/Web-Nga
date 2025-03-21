import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import styles from "../../../assets/style/components/AdminPage/sidebar.module.css"; 
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserCog, FaStore } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false); 

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <Container fluid className={`${styles.sidebar} ${isClosed ? styles.close : ""}`}>

      <div className={styles.btn_container}>
        <Button className={styles.btn_slideBar} onClick={toggleSidebar}>
          {isClosed ? <FaLongArrowAltRight /> :<FaLongArrowAltLeft />} 
        </Button>
      </div>
      
      {/* Danh sách menu */}
      <div className={styles.menu}>
        <Link to="/admin/dashboard" className={styles.link}>
          <TbLayoutDashboardFilled /> {!isClosed && "Dashboard"}
        </Link>
        <Link to="/admin/users" className={styles.link}>
          <FaUserCog /> {!isClosed && "Người dùng"}
        </Link>
        <Link to="/admin/shops" className={styles.link}>
          <FaStore /> {!isClosed && "Cửa hàng"}
        </Link>
        <Link to="/admin/products" className={styles.link}>
          <GiClothes /> {!isClosed && "Sản phẩm"}
        </Link>
        <Link to="/admin/categories" className={styles.link}>
          <IoBarChartSharp /> {!isClosed && "Danh Mục"}
        </Link>
      </div>
    </Container>
  );
};

export default Sidebar;
