import React from "react";
import logo from "../assets/chain.png";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Link Vault</h1>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search links..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
};

export default Header;
