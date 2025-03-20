import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header,HeaderChil,Footer, ChatWidget, ButtonScroll } from "./components";
import AppRouter from "./routes/AppRouter";
import AdminRoutes from "./routes/Admin/AdminRoutes";

function App() {
  return (
    <Router>
      {/* <Route path="/login" element={<Login/>}/> */}
      <HeaderWrapper />
      <div className="App">
        <Routes>
          <Route path="/*" element={<AppRouter />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
      <ButtonScroll />
      <ChatWidgetWrapper/>
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

function ChatWidgetWrapper() {
  const location = useLocation();
  const hideChat= ["/admin"]; 
  return hideChat.some((route) => location.pathname.startsWith(route)) ? null : <ChatWidget/>;
}


export default App;
