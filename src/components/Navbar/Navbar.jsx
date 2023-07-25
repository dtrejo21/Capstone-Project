import * as React from "react";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [menuVisble, setMenuVisble] = useState(false);
  const handleLogout = () => {};

  return (
    <div className="navbar">
      <div className="content">
        <div className="searchbar">
          <input type="text" placeholder="Search"></input>

          <button>
            <i className="material-icons">search</i>
          </button>
        </div>

        <button>
          <i className="material-icons">help</i>
        </button>
      </div>
    </div>
  );
}
