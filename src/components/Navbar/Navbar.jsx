import * as React from "react";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
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
