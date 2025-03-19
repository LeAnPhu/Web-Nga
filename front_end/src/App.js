import React from 'react';
import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom'; 
import { Header, Footer, ChatWidget, ButtonScroll } from './components';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <Router>
      <HeaderWrapper /> 
      <div className="App">
        <AppRouter/>
      </div>
      <ButtonScroll/>
      <ChatWidget />
      <Footer />
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ['/store','/cart'];

  return (
  
    !hideHeaderRoutes.includes(location.pathname) && <Header />
  );
}

export default App;
