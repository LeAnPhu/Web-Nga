import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Header, Footer, ChatWidget, ButtonScroll } from "./components";
import AppRouter from "./routes/AppRouter";
import AdminRoutes from "./routes/Admin/AdminRoutes";
import ShopRouter from "./routes/Shop/ShopRouter";
import { Login, Register, Forgot_Pass } from "./pages";
import PrivateRouter from "./routes/PrivateRouter";
import VerifyOTP from "./pages/verifyOTP";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeaderWrapper />
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/verify" element={<VerifyOTP/>} />
            <Route path="/forgot_password" element={<Forgot_Pass/>} />
            <Route path="/*" element={<AppRouter />} />

            {/* Đảm bảo PrivateRouter kiểm tra role chính xác */}
            <Route path="/admin/*" element={<PrivateRouter allowedRoles={["admin"]} />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>

            <Route path="/shop/*" element={<PrivateRouter allowedRoles={["shop_owner"]} />}>
              <Route path="*" element={<ShopRouter />} />
            </Route>
          </Routes>
        </div>
        <ButtonScroll />
        <ChatWidgetHide />
        <FooterWrapper />
      </Router>
    </Provider>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login","/register","/forgot_password", "/store", "/cart", "/admin", "/shop", "/product","/verify"];
  return hideHeaderRoutes.some((route) => location.pathname.startsWith(route)) ? null : <Header />;
}

function FooterWrapper() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/admin", "/shop","/register","/forgot_password","/verify"];
  return hideFooterRoutes.some((route) => location.pathname.startsWith(route)) ? null : <Footer />;
}

function ChatWidgetHide() {
  const location = useLocation();
  const hideFooterRoutes = ["/login","/register","/forgot_password","/verify"];
  return hideFooterRoutes.some((route) => location.pathname.startsWith(route)) ? null : <ChatWidget />;
}

export default App;
