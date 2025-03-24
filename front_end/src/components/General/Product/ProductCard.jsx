import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { motion } from "framer-motion";
import styles from "../../../assets/style/components/product_card.module.css";
import { WishToast } from "../../index";


const ProductCard = ({ product, onShow, showWishlist = true, showButton = true, showDescription = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div className={styles.cardHoverEffect}>
      <Card className="shadow-sm position-relative">
        {/* Wishlist icon (ẩn nếu không cần) */}
        {showWishlist && (
          <div className="favorite-icon" onClick={handleFavoriteClick}>
            {isFavorited ? <BiSolidHeart color="red" size={24} /> : <BiHeart size={24} />}
          </div>
        )}
        
        {/* Thông báo Wishlist */}
        <WishToast show={showToast} message={isFavorited ? "✅ Đã thêm vào Wishlist!" : "❌ Đã xóa khỏi Wishlist!"} onClose={() => setShowToast(false)} />
        
        <Card.Img variant="top" className={styles.fixed_image} src={product.img} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="text-danger fw-bold">{product.price}</Card.Text>

          {/* Mô tả sản phẩm (ẩn nếu không cần) */}
          {showDescription && <Card.Text className="text-muted">{product.description}</Card.Text>}
          
          {/* Nút "Xem Chi Tiết" (ẩn nếu không cần) */}
          {showButton && <Button onClick={() => onShow(product)}>Xem Chi Tiết</Button>}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
