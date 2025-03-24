import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "../../../assets/style/components/product_card.module.css";
import { WishToast } from "../../index";

const ProductCard = ({ product, showWishlist = true, showButton = true, showDescription = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleViewDetail = () => {
    navigate(`/product/${product.id}`); 
  };

  return (
    <motion.div className={styles.cardHoverEffect}>
      <Card className="shadow-sm position-relative">
        {showWishlist && (
          <div className="favorite-icon" onClick={handleFavoriteClick}>
            {isFavorited ? <BiSolidHeart color="red" size={24} /> : <BiHeart size={24} />}
          </div>
        )}

        <WishToast show={showToast} message={isFavorited ? "✅ Đã thêm vào Wishlist!" : "❌ Đã xóa khỏi Wishlist!"} onClose={() => setShowToast(false)} />

        <Card.Img variant="top" className={styles.fixed_image} src={product.img} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="text-danger fw-bold">{product.price}</Card.Text>

          {showDescription && <Card.Text className="text-muted">{product.description}</Card.Text>}
          
          {showButton && <Button onClick={handleViewDetail}>Xem Chi Tiết</Button>}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
