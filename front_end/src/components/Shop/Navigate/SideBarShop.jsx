import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserCog, FaStore } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import styles from "../../../assets/style/components/ShopPage/sidebarshop.module.css";

const SideBarShop = () => {
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
        <Link to="/shop/dashboard" className={styles.link}>
          <TbLayoutDashboardFilled /> {!isClosed && "Dashboard"}
        </Link>
        <Link to="/shop/orders" className={styles.link}>
          <FaUserCog /> {!isClosed && "Đơn hàng"}
        </Link>
        <Link to="/shop/coupons" className={styles.link}>
          <GiClothes /> {!isClosed && "Mã giảm giá"}
        </Link>
        <Link to="/shop/products" className={styles.link}>
          <IoBarChartSharp /> {!isClosed && "Quản lý sản phẩm "}
        </Link>
      </div>
    </Container>
  );
};

export default SideBarShop;
