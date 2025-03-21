import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import styles from "../../../assets/style/components/AdminPage/shopanalytics.module.css";

const ShopAnalytics = () => {
  // Dữ liệu biểu đồ
  const data = [
    { name: "Tổng cửa hàng", Số: 120 },
    { name: "Hoạt động", Số: 95 },
  ];

  // Danh sách màu sắc cho từng cột
  const colors = ["#72AEE6","#4CAF50"]; 

  return (
    <div className={styles.analytics}>
      <h2>Thống kê Cửa hàng</h2>
      
      {/* Biểu đồ cột */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={60}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Số">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} /> 
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShopAnalytics;
