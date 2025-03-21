import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import styles from "../../../assets/style/components/AdminPage/productanalytics.module.css";

// Giả lập dữ liệu sản phẩm
const generateProductData = (count, min, max) => {
  const categories = ["Áo", "Giày", "Túi", "Đồng hồ", "Quần", "Mũ", "Balo"];
  return Array.from({ length: count }, (_, index) => ({
    name: `${categories[index % categories.length]} ${index + 1}`,
    số_lượng: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const productCount = 10; // Tổng số sản phẩm
const dataProducts = generateProductData(productCount, 0, 20); // Có thể có sản phẩm hết hàng

const ProductAnalytics = () => {
  // Tìm sản phẩm bán chạy nhất
  const bestSellingProduct = dataProducts.reduce((max, product) =>
    product.số_lượng > max.số_lượng ? product : max, dataProducts[0]);

  // Lọc sản phẩm hết hàng
  const outOfStockProducts = dataProducts.filter(product => product.số_lượng === 0);

  // Lọc sản phẩm còn hàng nhưng tồn kho cao (trên 10 sản phẩm)
  const inStockProducts = dataProducts.filter(product => product.số_lượng > 10);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = [
    { name: "Sản phẩm bán chạy", Số: bestSellingProduct.số_lượng, color: "#4CAF50" }, // Xanh lá
    { name: "Sản phẩm hết hàng", Số: outOfStockProducts.length, color: "#F44336" },  // Đỏ
    { name: "Sản phẩm tồn kho cao", Số: inStockProducts.length, color: "#2196F3" },  // Xanh dương
  ];

  return (
    <div className={styles.productAnalytics}>
      <h2>📊 Thống kê Sản phẩm ({productCount}+ sản phẩm)</h2>

      {/* Hiển thị thông tin chính */}
      <div className={styles.productInfo}>
        <p>🔥 <strong>Sản phẩm bán chạy:</strong> {bestSellingProduct.name} ({bestSellingProduct.số_lượng} sản phẩm)</p>
        <p>📉 <strong>Sản phẩm hết hàng:</strong> {outOfStockProducts.length} sản phẩm</p>
      </div>

      {/* Danh sách sản phẩm hết hàng */}
      <div className={styles.productList}>
        <h4>📉 Sản phẩm hết hàng ({outOfStockProducts.length})</h4>
        <ul>
          {outOfStockProducts.map(product => (
            <li key={product.name}>⚠️ {product.name}</li>
          ))}
        </ul>
      </div>

      {/* Danh sách sản phẩm tồn kho cao */}
      <div className={styles.productList}>
        <h4>📦 Sản phẩm tồn kho cao ({inStockProducts.length})</h4>
        <ul>
          {inStockProducts.map(product => (
            <li key={product.name}>✅ {product.name} ({product.số_lượng} sản phẩm)</li>
          ))}
        </ul>
      </div>

      {/* Biểu đồ thống kê */}
      <div className={styles.chartContainer}>
        <h3>📈 Biểu đồ Thống kê</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={60}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Số">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductAnalytics;
