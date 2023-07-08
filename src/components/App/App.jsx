import { useState } from 'react'
import './App.css'
import Navbar from "../Navbar/Navbar"
import Sidebar from '../Sidebar/Sidebar'
import * as React from "react"
import Home from "../Home/Home"


export default function App() {
  const [classes, setClasses] = useState("");
  const [tasks, setTasks] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div>
      <Navbar/>
      <Home/>
      <Sidebar isOpen={isOpen} handleToggle={handleToggle}/>
      
    </div>
    </>
  )
}
