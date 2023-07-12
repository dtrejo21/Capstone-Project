import { useState } from 'react'
import './App.css'
import Navbar from "../Navbar/Navbar"
import Sidebar from '../Sidebar/Sidebar'
import * as React from "react"
import Home from "../Home/Home"


export default function App() {
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

  return (
    <div>
      <Navbar/>
      <Sidebar isOpen={isOpen} handleToggle={handleToggle}/>
      <Home isOpen={isOpen} handleClick={handleClick}
            handleInputChange={handleInputChange}
            inputValue={inputValue} showInput={showInput}
            handleButton={handleButton}/>
    </div>
  )
}
