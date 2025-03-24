import React from "react";
import { Table, Button, Form } from "react-bootstrap";

const CategoryTable = ({
  categories,
  editingCategory,
  editName,
  setEditName,
  handleEditCategory,
  handleDeleteCategory,
  handleSaveEdit,
  currentPage,
}) => {
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Tên danh mục</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {selectedCategories.map((category) => (
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
  );
};

export default CategoryTable;
