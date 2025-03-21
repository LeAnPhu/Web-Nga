import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { month: "Tháng Một", Doanh_thu: 4000 },
  { month: "Tháng Hai", Doanh_thu: 3000 },
  { month: "Tháng Ba", Doanh_thu: 5000 },
  { month: "Tháng Tư", Doanh_thu: 7000 },
  { month: "Tháng Năm", Doanh_thu: 6000 },
  { month: "Tháng Sáu", Doanh_thu: 8000 },
  { month: "Tháng Bảy", Doanh_thu: 7500 },
  { month: "Tháng Tám", Doanh_thu: 9000 },
  { month: "Tháng Chín", Doanh_thu: 6500 },
  { month: "Tháng Mười", Doanh_thu: 8500 },
  { month: "Tháng Mười Một", Doanh_thu: 9500 },
  { month: "Tháng Mười Hai", Doanh_thu: 11000 },
];

const SalesAnalytics = () => {
  return (
    <div className="sales-analytics-container">
      <h2 className="title">📈 Thống kê doanh số theo tháng</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Doanh_thu" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics;
