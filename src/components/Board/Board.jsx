import * as React from "react";
import "./Board.css";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ClassCard from "../ClassCard/ClassCard";
import ClockLoader from "react-spinners/ClockLoader";

//this is the home page, where you see all of the classes
//displayed, and where you have to call classes
export default function Home() {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/getBoard", { withCredentials: true })
      .then((response) => {
        setBoard(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home">
      {loading ? (
        <div className="loading-screen">
          <ClockLoader color="#7552FF" size={150} />
        </div>
      ) : (
        <div className="home-page">
          <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
          <div className={`home-content ${isOpen ? "sidebar-open" : ""}`}>
            <h1>{board.title}</h1>
            <ClassCard />
          </div>
        </div>
      )}
    </div>
  );
}
