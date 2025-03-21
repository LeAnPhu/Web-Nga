import React, { useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Giày thể thao" },
    { id: 2, name: "Áo khoác" },
    { id: 3, name: "Quần jeans" },
    { id: 4, name: "Giày Adidas" },
    { id: 5, name: "Áo khoác" },
    { id: 6, name: "Quần jeans" },
    { id: 7, name: "Giày thể thao" },
    { id: 8, name: "Áo khoác" },
    { id: 9, name: "Quần jeans" },
    { id: 10, name: "Giày thể thao" },
    { id: 11, name: "Áo khoác" },
    { id: 12, name: "Quần jeans" },
    { id: 13, name: "Giày thể thao" },
    { id: 14, name: "Áo khoác" },
    { id: 15, name: "Quần jeans" },
    { id: 16, name: "Giày thể thao" },
    { id: 17, name: "Áo khoác" },
    { id: 18, name: "Quần jeans" },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");

  // Thêm danh mục mới
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newEntry = {
        id: categories.length + 1,
        name: newCategory,
      };
      setCategories([...categories, newEntry]);
      setNewCategory("");
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Bắt đầu chỉnh sửa
  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory ? { ...cat, name: editName } : cat
      )
    );
    setEditingCategory(null);
    setEditName("");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Danh Mục</h3>

      {/* Form thêm danh mục */}
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

      {/* Bảng danh mục */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                {editingCategory === category.id ? (
                  <Form.Control
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editingCategory === category.id ? (
                  <Button variant="success" size="sm" onClick={handleSaveEdit}>
                    Lưu
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      Sửa
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Xóa
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesAdmin;
