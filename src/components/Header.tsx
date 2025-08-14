import React from "react";
import logo from "../assets/chain.png";
import { TextInput } from "./TextInput";

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

      <TextInput
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
        id="search"
        className="search-input"
        placeholder="search by name, url, description, tags..."
      />
    </header>
  );
};

export default Header;
