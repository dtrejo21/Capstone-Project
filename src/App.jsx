import "./App.css";
import * as React from "react";
import Home from "./components/Board/Board";
import Calendar from "./components/Calendar/Calendar";
import StudySpace from "./components/StudySpace/StudySpace";
import Profile from "./components/Profile/Profile";
import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import SubjectPage from "./components/SubjectPage/SubjectPage";
import TaskForm from "./components/TaskForm/TaskForm";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="app">
      <Navbar />
      <Routes location={background || location}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/subjects/:subjectTitle/:subjectId"
          element={<SubjectPage />}
        />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/study-space" element={<StudySpace />} />
        <Route path="/profile" element={<Profile />} />
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
