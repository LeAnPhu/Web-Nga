import React from "react";
import { Button } from "react-bootstrap";

const CouponAction = ({ onAdd }) => {
  return (
    <Button variant="success" onClick={onAdd}>
      Thêm Mã Giảm Giá
    </Button>
  );
};

export default CouponAction;
