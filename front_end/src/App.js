import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header,HeaderChil,Footer, ChatWidget, ButtonScroll } from "./components";
import AppRouter from "./routes/AppRouter";
import AdminRoutes from "./routes/Admin/AdminRoutes";
import ShopRouter from "./routes/Shop/ShopRouter";
function App() {
  return (
    <Router>
      {/* <Route path="/login" element={<Login/>}/> */}
      <HeaderWrapper />
      <div className="App">
        <Routes>
          <Route path="/*" element={<AppRouter />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/shop/*" element={<ShopRouter />} />
        </Routes>
      </div>
      <ButtonScroll />
      <ChatWidget/>
      <FooterWrapper/>
    </Router>
  );
}

// Ẩn Header ở một số trang
function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ["/store", "/cart", "/admin" ,"/shop"]; 
  return hideHeaderRoutes.some((route) => location.pathname.startsWith(route)) ? null : <Header />;
}

function FooterWrapper() {
  const location = useLocation();
  const hideFooterRoutes = ["/admin/*", "/shop/*"];
  if (hideFooterRoutes.includes(location.pathname) || location.pathname.startsWith("/admin") || location.pathname.startsWith("/shop")) {
    return ;
  }
  return <Footer />;
}

export default App;
