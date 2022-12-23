import React from "react";
import Search from "./Search";

const Header = ({ address, setAddress, handleSelect }) => {
  return (
    <header>
      <div className="logo">
        <h1>Mosam</h1>
      </div>
      <Search
        address={address}
        setAddress={setAddress}
        handleSelect={handleSelect}
      />
    </header>
  );
};

export default Header;
