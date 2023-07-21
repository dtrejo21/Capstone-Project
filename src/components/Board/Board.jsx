import * as React from "react"
import "./Board.css"
import { useState, useEffect } from "react"
import Classes from "../Classes/Classes"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Welcome from "../Welcome/Welcome"
import { UserContext } from "../../UserContext"
import axios from "axios"

//this is the home page, where you see all of the classes
//displayed, and where you have to call classes
export default function Home(){ 
  const [board, setBoard] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8000/getBoard", { withCredentials: true })
    .then((response) => {
      setBoard(response.data);
    })
    .catch((err) => console.log(err));
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

    return(
      <div className="home">
        <Navbar/>
        <Sidebar isOpen={isOpen} handleToggle={handleToggle}/>
        <div className={`home-content ${isOpen ? "sidebar-open": ""}`}>
          <h1>{board.title}</h1>
          <Classes/>
        </div>
      </div>
    )
}