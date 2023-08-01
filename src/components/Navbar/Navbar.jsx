import * as React from "react";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  //navigate to a new page
  const handleSortSubmit = (e) => {
    e.preventDefault();
    navigate("/sort");
  };
  return (
    <div className="navbar">
      <div className="content">
        <div className="searchbar">
          <input type="text" placeholder="Search"></input>

          <button>
            <i className="material-icons">search</i>
          </button>
        </div>
        <div className="sorting">
          <Link to={`/sort`}>
          <button className="sort-tasks" onClick={handleSortSubmit}>
            <i className="material-icons">sort</i>
          </button>
          </Link>
        </div>

        <button>
          <i className="material-icons">help</i>
        </button>
      </div>
    </div>
  );
}
