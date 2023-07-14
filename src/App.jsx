import './App.css'
import * as React from "react"
import Home from "./components/Home/Home"
import LoginForm from "./components/LoginForm/LoginForm"
import SignupForm from './components/SignupForm/SignupForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={ <Home /> } />
          </Routes>
        </BrowserRouter>
    </div>
  )
}
