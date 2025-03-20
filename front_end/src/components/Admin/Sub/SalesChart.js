import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "../../../assets/style/components/AdminPage/salesChart.module.css";
const SalesChart = () => {
  const data = [
    { name: "Cửa hàng A", revenue: 50000 },
    { name: "Cửa hàng B", revenue: 75000 },
    { name: "Cửa hàng C", revenue: 60000 },
    { name: "Cửa hàng D", revenue: 45000 },
    { name: "Cửa hàng E", revenue: 30000 },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0"];

  return (
    <div className={styles.salesChart}>
      <h2>Doanh thu từng cửa hàng</h2>
      <ResponsiveContainer width="100%" height={550}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            dataKey="revenue"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
