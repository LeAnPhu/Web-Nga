import React from "react";

const ProductTable = () => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Sản phẩm</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Áo Hoodie</td>
          <td>250,000 VNĐ</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductTable;
