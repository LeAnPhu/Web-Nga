import React from "react";
import { Button } from "react-bootstrap";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
          {product.img ? (
          <img
            src={product.img}
            alt={product.name}
            style={{ width: "250px", height: "300px",}}
          />
              ) : (
          <span>Không có ảnh</span>
          )}
      </td>
      <td className="text-center align-middle">{product.name}</td>
      <td className="text-center align-middle">{product.category}</td>
      <td className="text-center align-middle">{product.price.toLocaleString()} đ</td>
      <td className={`text-center align-middle ${product.status === "Còn hàng" ? "text-success" : "text-danger"}`}>
        {product.status}
      </td>
      <td className="text-center align-middle ">⭐ {product.rating} / 5</td>
      <td className="text-center align-middle">
        <Button variant="warning" size="sm" onClick={() => onEdit(product)}>Sửa</Button>{" "}
        <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>Xóa</Button>
      </td>
    </tr>
  );
};

export default ProductItem;
