import "./App.css";
import * as React from "react";
import Home from "./components/Board/Board";
import Calendar from "./components/Calendar/Calendar";
import StudySpace from "./components/StudySpace/StudySpace";
import Profile from "./components/Profile/Profile";
import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import SubjectPage from "./components/SubjectPage/SubjectPage";
import TaskForm from "./components/TaskForm/TaskForm";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const background = location.state && location.state.background;

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8000/getUser")
      .then((response) => {
        //console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value="">
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
            <Route path="/:subtaskTitle/:subtaskId"/>
          </Routes>
        )}
      </UserContext.Provider>
    </div>
  );
}
