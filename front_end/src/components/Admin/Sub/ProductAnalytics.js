import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import styles from "../../../assets/style/components/AdminPage/productanalytics.module.css";

const ProductAnalytics = () => {
  const data = [
    { name: "Sản phẩm bán chạy", Số: 150, color: "#4CAF50" }, // Xanh lá
    { name: "Sản phẩm hết hàng", Số: 30, color: "#F44336" },  // Đỏ
    { name: "Sản phẩm mới", Số: 45, color: "#2196F3" },       // Xanh dương
    { name: "Sản phẩm tồn kho", Số: 70, color: "#FFC107" },   // Vàng
  ];

  return (
    <div className="product-analytics-card">
      <h2>Thống kê Sản phẩm</h2>
      <p>🔥 Sản phẩm bán chạy: <strong>Áo Hoodie</strong></p>
      <p>📉 Sản phẩm hết hàng: <strong>30</strong></p>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={60}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Số">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} /> 
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductAnalytics;
