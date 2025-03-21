import React from "react";
import { Table, Button } from "react-bootstrap";

const CouponList = ({ coupons, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mã</th>
          <th>Giảm Giá</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((coupon) => (
          <tr key={coupon.id}>
            <td>{coupon.id}</td>
            <td>{coupon.code}</td>
            <td>{coupon.discount}%</td>
            <td>{coupon.status}</td>
            <td>
              <Button variant="info" size="sm" onClick={() => onEdit(coupon)}>
                Chỉnh sửa
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(coupon.id)}>
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CouponList;
