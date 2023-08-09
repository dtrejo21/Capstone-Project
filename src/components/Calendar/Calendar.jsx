import React, { useEffect, useState } from "react";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

export default function Calendar() {
  const [taskEvents, setTaskEvents] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8000/task/completedTask", {
        withCredentials: true,
      })
      .then((result) => {
        const eventExtracted = result.data.map((task) => ({
            title: task.title,
            date: task.dueDate
        }))
        setTaskEvents(eventExtracted);
      })
      .catch(err => console.log(err))
  }, []);
  return (
    <div className="calendar">
      <div className="calendar-page-wrapper">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={taskEvents}/>
      </div>
    </div>
  );
}
