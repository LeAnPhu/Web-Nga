import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";


const data = [
  { month: "Jan", followers: 120 },
  { month: "Feb", followers: 150 },
  { month: "Mar", followers: 170 },
  { month: "Apr", followers: 200 },
  { month: "May", followers: 260 },
  { month: "Jun", followers: 300 },
  { month: "Jul", followers: 350 },
  { month: "Aug", followers: 400 },
  { month: "Sep", followers: 100 },
  { month: "Oct", followers: 620 },
  { month: "Nov", followers: 720 },
  { month: "Dec", followers: 900 },
];

const FollowerAnalytics = () => {
  return (
    <div className="follower-card">
      <h2 className="title">💖Thống kê người theo dõi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="followers" stroke="#FF7043" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FollowerAnalytics;
