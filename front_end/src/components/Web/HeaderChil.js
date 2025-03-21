import React, { useState } from "react";
import { Link } from "react-router-dom";
const HeaderChil = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm..." />
          <button>🔍</button>
        </div>

        {/* Avatar & Dropdown */}
        <div className="user-menu">
          <div className="avatar" onClick={toggleDropdown}>
            <img src="/avatar.png" alt="User Avatar" />
          </div>
          {isOpen && (
            <ul className="dropdown">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><button>Logout</button></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderChil;
