import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const CategoryForm = ({ newCategory, setNewCategory, handleAddCategory }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Nhập tên danh mục"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button variant="primary" onClick={handleAddCategory}>
        Thêm
      </Button>
    </InputGroup>
  );
};

export default CategoryForm;
