import './App.css'
import * as React from "react"
import Home from "./components/Home/Home"
import Calendar from './components/Calendar/Calendar'
import StudySpace from './components/StudySpace/StudySpace'
import Profile from './components/Profile/Profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome'
import { UserContext } from './UserContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ClassCard from './components/ClassCard/ClassCard'

export default function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/getUser")
    .then(user => { 
      setUser(user.data)
    })
    .catch(err => console.log(err))
  })

  return (
    <div className="app">
      <UserContext.Provider value="user">
          <BrowserRouter>
            <Routes>
              <Route path="/welcome" element={<Welcome/>}/>
              <Route path="/" element={ <Home /> } />
              <Route path="/subjects/:name" element={<ClassCard/>}/>
              <Route path="/calendar" element={<Calendar/>}/>
              <Route path="/study-space" element={<StudySpace/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
    </div>
  )
}
