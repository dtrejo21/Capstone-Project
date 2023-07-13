import * as React from "react"
import "./Home.css"
import { useState } from "react"
import Classes from "../Classes/Classes"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"

//this is the home page, where you see all of the classes
//displayed, and where you have to call classes
export default function Home(){
      //const [classes, setClasses] = useState("");
  //const [tasks, setTasks] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("")

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleButton = () => {
    setShowInput(true);
  }


    return(
        <div className="home">
            <Navbar/>
            <Sidebar isOpen={isOpen} handleToggle={handleToggle}/>
            <h2>Workspace</h2>
            <Classes isOpen={isOpen}
                     handleClick={handleClick}
                     handleInputChange={handleInputChange}
                     inputValue={inputValue} showInput={showInput}
                     handleButton={handleButton}/>
        </div>
    )
}