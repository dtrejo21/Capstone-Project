import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, handleToggle }) {
  return (
    <section className={isOpen ? "sidebar open" : "sidebar close"}>
      <button className="toggle-button" onClick={handleToggle}>
        <i className="material-icons">menu</i>
      </button>

      {isOpen && (
        <ul className="options">
          <li>
            <Link to="/profile">
              Profile
              <i className="material-icons">account_circle</i>
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              Calendar
              <i className="material-icons">calendar_today</i>
            </Link>
          </li>
          <li>
            <Link to="/study-space">
              Study Space
              <i className="material-icons">auto_stories</i>
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
}
