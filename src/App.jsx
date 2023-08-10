import "./App.css";
import React, { useState } from "react";
import Home from "./components/Board/Board";
import Calendar from "./components/Calendar/Calendar";
import StudySpace from "./components/StudySpace/StudySpace";
import Profile from "./components/Profile/Profile";
import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import SubjectPage from "./components/SubjectPage/SubjectPage";
import TaskForm from "./components/TaskForm/TaskForm";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      {!location.pathname.startsWith("/welcome") && (
        <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      )}
      <Routes location={background || location}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route
          path="/subjects/:subjectTitle/:subjectId"
          element={<SubjectPage isOpen={isOpen} />}
        />
        <Route path="/calendar" element={<Calendar isOpen={isOpen} />} />
        <Route path="/study-space" element={<StudySpace isOpen={isOpen} />} />
        <Route path="/profile" element={<Profile isOpen={isOpen} />} />
        <Route path="/:taskTitle/:taskId" element={<TaskForm />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/:taskTitle/:taskId" element={<TaskForm />} />
          <Route path="/:subtaskTitle/:subtaskId" />
        </Routes>
      )}
    </div>
  );
}
