import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "../../../assets/style/components/AdminPage/salesChart.module.css";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0", "#FF5722", "#795548"];

// Dữ liệu mẫu để test nếu `stores` không có dữ liệu
const defaultData = [
  { name: "Cửa hàng A", revenue: 50000 },
  { name: "Cửa hàng B", revenue: 75000 },
  { name: "Cửa hàng C", revenue: 60000 },
  { name: "Cửa hàng D", revenue: 45000 },
  { name: "Cửa hàng E", revenue: 30000 },
];

const SalesChart = ({ stores }) => {
  // Đảm bảo stores luôn là một mảng hợp lệ
  const validStores = Array.isArray(stores) && stores.length > 0 ? stores : defaultData;

  // Sắp xếp doanh thu giảm dần & chỉ lấy 7 cửa hàng có doanh thu cao nhất
  const sortedStores = [...validStores].sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  const displayedStores = sortedStores.slice(0, 7);

  return (
    <div className={styles.salesChart}>
      <h2>📊 Doanh thu cửa hàng</h2>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={displayedStores}
            cx="50%"
            cy="50%"
            outerRadius={180}
            dataKey="revenue"
            label={({ name, percent }) => `${name || "Không xác định"} (${(percent * 100).toFixed(1)}%)`}
          >
            {displayedStores.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value?.toLocaleString() || 0} VNĐ`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
