import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header,Footer, ChatWidget, ButtonScroll } from "./components";
import AppRouter from "./routes/AppRouter";
import AdminRoutes from "./routes/Admin/AdminRoutes";
import ShopRouter from "./routes/Shop/ShopRouter";
import Login from "./pages/login";
function App() {
  return (
    <Router>
      <HeaderWrapper />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppRouter />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/shop/*" element={<ShopRouter />} />
        </Routes>
      </div>
      <ButtonScroll />
      <ChatWidgetHide/>
      <FooterWrapper/>
    </Router>
  );
}

// Ẩn Header ở một số trang
function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login","/store", "/cart", "/admin" ,"/shop" ,"/product"]; 
  return hideHeaderRoutes.some((route) => location.pathname.startsWith(route)) ? null : <Header />;
}

function FooterWrapper() {
  const location = useLocation();
  const hideFooterRoutes = ["/login","/admin/*", "/shop/*"];
  if (hideFooterRoutes.includes(location.pathname) || location.pathname.startsWith("/admin") || location.pathname.startsWith("/shop")) {
    return ;
  }
  return <Footer />;
}

function ChatWidgetHide()
{
  const location = useLocation();
  const hideChatWidgetRoutes = ["/login",];
  if (hideChatWidgetRoutes.includes(location.pathname)){
    return ;
  }
  return <ChatWidget/>
}
export default App;
