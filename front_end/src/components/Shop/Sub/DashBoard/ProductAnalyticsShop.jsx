import React from "react";
import { 
  LineChart, Line, 
  BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

// Giả lập dữ liệu sản phẩm
const generateProductData = (count, min, max) => {
  const categories = ["Áo", "Giày", "Túi", "Đồng hồ", "Quần", "Mũ", "Balo"];
  return Array.from({ length: count }, (_, index) => ({
    name: `${categories[index % categories.length]} ${index + 1}`,
    số_lượng: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const productCount = 10; // Tổng số sản phẩm
const visibleProducts = 10; // Số lượng hiển thị ban đầu
const dataProducts = generateProductData(productCount, 0, 20); // Có thể có sản phẩm hết hàng

const ProductAnalyticsShop = () => {
  // Tìm sản phẩm bán chạy nhất
  const bestSellingProduct = dataProducts.reduce((max, product) => 
    product.số_lượng > max.số_lượng ? product : max, dataProducts[0]);

  // Đếm số lượng sản phẩm hết hàng
  const outOfStockCount = dataProducts.filter(product => product.số_lượng === 0).length;

  const outInStockCount = dataProducts.filter(product => product.số_lượng > 10).length;

  return (
    <div className="product-analytics-container">
      <h4 className="title">📊 Thống kê sản phẩm ({productCount}+ sản phẩm)</h4>

      {/* Thông tin sản phẩm đặc biệt */}
      <div className="product-info">
        <p>🔥 <strong>Sản phẩm bán chạy:</strong> {bestSellingProduct.name} ({bestSellingProduct.số_lượng} sản phẩm)</p>
        <p>📉 <strong>Sản phẩm hết hàng:</strong> {outOfStockCount} sản phẩm</p>
        <p>📦 <strong>Sản phẩm tồn kho:</strong> {outInStockCount} sản phẩm</p>
      </div>

      <div className="chart-card" 
        style={{ 
          overflowX: "auto", 
          paddingBottom: "20px",
          maxHeight: "350px", // Giới hạn chiều cao tối đa
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h5 className="chart-title">📈 Thống kê số lượng sản phẩm</h5>
        <div 
          style={{ 
            minWidth: productCount > visibleProducts ? productCount * 15 : "100%", 
            flex: 1
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            {productCount > 50 ? (
              // Biểu đồ đường nếu số sản phẩm nhiều
              <LineChart data={dataProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip cursor={{ stroke: "#64B5F6", strokeWidth: 1 }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="số_lượng" 
                  stroke="#64B5F6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#64B5F6" }} 
                />
              </LineChart>
            ) : (
              // Biểu đồ cột ngang nếu sản phẩm ít
              <BarChart layout="vertical" data={dataProducts} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip cursor={{ fill: "#e3f2fd" }} />
                <Legend />
                <Bar 
                  dataKey="số_lượng" 
                  fill="#64B5F6" 
                  radius={[10, 10, 0, 0]} 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalyticsShop;
