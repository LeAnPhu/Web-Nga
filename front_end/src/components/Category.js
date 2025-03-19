import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {  Row, Col, Card} from "react-bootstrap";
import styles from "../assets/style/components/category.module.css";
const Category = () => {
    const categories = [
        { id: 1, name: "Áo Nam", img: require("../assets/image/icon/ao_nam.png") },
        { id: 2, name: "Áo Nữ", img: require("../assets/image/icon/ao_nu.png") },
        { id: 3, name: "Áo Trẻ Em", img: require("../assets/image/icon/ao_tre_em.png") },
        { id: 4, name: "Áo Hè", img: require("../assets/image/icon/ao_he.png") },
        { id: 5, name: "Áo Đông", img: require("../assets/image/icon/ao_dong.png") },
        { id: 6, name: "Quần", img: require("../assets/image/icon/quan.png") },
        { id: 7, name: "Giày Dép", img: require("../assets/image/icon/ao_nam.png") },
        { id: 8, name: "Phụ Kiện", img: require("../assets/image/icon/phu_kien.png") },
      ];
    return (
        <Row className="mb-4">
            {categories.map((category) => (
            <Col key={category.id} xs={6} md={3} className="mb-4">
                <Link to={`/category/${category.id}`} className="text-decoration-none">
                <motion.div   className={styles.cardHoverEffect}  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <Card className="text-center shadow-sm" >
                    <Card.Img variant="top" fluid src={category.img} />
                    <Card.Body>
                        <Card.Title>{category.name}</Card.Title>
                    </Card.Body>
                    </Card>
                </motion.div>
                </Link>
            </Col>
            ))}
        </Row>
    );
}

export default Category