import React from "react";
import { Button } from "react-bootstrap";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
      </td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price.toLocaleString()} đ</td>
      <td>{product.status}</td>
      <td>⭐ {product.rating} / 5</td>
      <td>
        <Button variant="warning" size="sm" onClick={() => onEdit(product)}>Sửa</Button>{" "}
        <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>Xóa</Button>
      </td>
    </tr>
  );
};

export default ProductItem;
