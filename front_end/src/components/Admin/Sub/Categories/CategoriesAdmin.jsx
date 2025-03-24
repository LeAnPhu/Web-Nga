import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import PaginationComponent from "../../../General/UI/PaginationComponent";

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
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Thêm danh mục
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newEntry = { id: categories.length + 1, name: newCategory };
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
      <CategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} 
      />
      <CategoryTable
        categories={categories}
        editingCategory={editingCategory}
        editName={editName}
        setEditName={setEditName}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
        handleSaveEdit={handleSaveEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CategoriesAdmin;
