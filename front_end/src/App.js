import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header,HeaderChil,Footer, ChatWidget, ButtonScroll } from "./components";
import AppRouter from "./routes/AppRouter";
import AdminRoutes from "./routes/Admin/AdminRoutes";

function App() {
  return (
    <Router>
      <HeaderWrapper />
      <div className="App">
        <Routes>
          <Route path="/*" element={<AppRouter />} />
          <Route path="/admin/*" element={<AdminRoutes/>} />
        </Routes>
      </div>
      <ButtonScroll />
      <ChatWidget />
      <FooterWrapper/>
    </Router>
  );
}

// Ẩn Header ở một số trang
function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ["/store", "/cart", "/admin"]; 
  return hideHeaderRoutes.some((route) => location.pathname.startsWith(route)) ? null : <Header />;
}

function FooterWrapper() {
  const location = useLocation();
  const hideFooterRoutes = ["/admin/*"];
  if (hideFooterRoutes.includes(location.pathname) || location.pathname.startsWith("/admin")) {
    return ;
  }
  return <Footer />;
}

export default App;
