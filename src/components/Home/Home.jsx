import * as React from "react"
import "./Home.css"
import { useState } from "react"
import Classes from "../Classes/Classes"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Welcome from "../Welcome/Welcome"
import { UserContext } from "../../UserContext"

//this is the home page, where you see all of the classes
//displayed, and where you have to call classes
export default function Home(){ 
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

    return(
      <div className="home">
        <Navbar/>
        <Sidebar isOpen={isOpen} handleToggle={handleToggle}/>
        <div className={`home-content ${isOpen ? "sidebar-open": ""}`}>
          <h1>Workspace</h1>
          <Classes isOpen={isOpen}
                 handleClick={handleClick}/>
        </div>

      </div>
    )
}