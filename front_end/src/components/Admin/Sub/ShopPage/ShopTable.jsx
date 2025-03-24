import React, { useState } from "react";
import ShopSearchBar from "./ShopSearchBar";
import ShopTableBody from "./ShopTableBody";
import PaginationComponent from "../../../General/UI/PaginationComponent";

const ShopTable = () => {
  const [shops, setShops] = useState([
    { id: 1, name: "Nike Store", email: "nike@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/logo_store/balan.png"), },
    { id: 2, name: "Adidas Shop", email: "adidas@gmail.com", status: "Tạm khóa", img: require("../../../../assets/image/logo_store/adidas.png"), },
    { id: 3, name: "Puma Outlet", email: "puma@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/logo_store/nike.png"), },
    { id: 4, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa", img: require("../../../../assets/image/logo_store/rick_owen.png"), },
    { id: 5, name: "Reebok Hub", email: "reebok@gmail.com", status: "Hoạt động", img: require("../../../../assets/image/logo_store/rick_owen.png"), },
    { id: 6, name: "Reebok Hub", email: "reebok@gmail.com", status: "Tạm khóa", img: require("../../../../assets/image/logo_store/adidas.png"), },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editShop, setEditShop] = useState(null);
  const shopsPerPage = 4;

  const handleDelete = (id) => {
    setShops(shops.filter((shop) => shop.id !== id));
  };

  const handleEditShop = (shop) => {
    setEditShop(shop);
  };

  const handleSaveEdit = () => {
    setShops(shops.map((shop) => (shop.id === editShop.id ? editShop : shop)));
    setEditShop(null);
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý Cửa hàng</h3>
      
      <ShopSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <ShopTableBody
        currentShops={currentShops}
        editShop={editShop}
        setEditShop={setEditShop}
        handleEditShop={handleEditShop}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default ShopTable;
