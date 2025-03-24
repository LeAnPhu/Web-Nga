import React from "react";
import { Table} from "react-bootstrap";
import ProductItem from "../../General/Product/ProductItem";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Trạng thái</th>
          <th>Đánh giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
