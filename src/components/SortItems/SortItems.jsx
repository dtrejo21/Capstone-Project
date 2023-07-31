import React, { useState } from "react";
import axios from "axios";
import "./SortItems.css";

export default function SortItems() {
  const [task, setTask] = useState([]);
  const [subtask, setSubtask] = useState([]);

  //Format date
  const formatDueDate = (date) => {
    if (date === null) {
      return null;
    } else {
      const dueDate = new Date(date);
      const format = { month: "long", day: "numeric" };
      return dueDate.toLocaleString("en-US", format);
    }
  };

  const handleTaskSort = () => {
    axios
      .get("http://localhost:8000/sortTasks")
      .then((result) => {
        console.log(result);
        setTask(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubtaskSort = () => {
    axios
      .get("http://localhost:8000/sortSubtasks")
      .then((result) => {
        console.log(result);
        setSubtask(result.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="sort-page">
      <h1>Sort Tasks & Subtasks</h1>

      <button className="sort-button" onClick={handleTaskSort}>
        Sort Tasks
      </button>
      {task.map((tasks, index) => (
        <div className="tasks-sorted" key={`task_${index}`}>
          <p>{tasks.title}: {formatDueDate(tasks.dueDate)}</p>
         
        </div>
      ))}
      <button className="sort-subtask" onClick={handleSubtaskSort}>
        Sort Subtasks
      </button>
      {subtask.map((subtasks, index) => (
        <div className="subtasks-sorted" key={`subtask_${index}`}>
          <p>{subtasks.subtaskTitle}: {formatDueDate(subtasks.dueDate)}</p>
         
        </div>
      ))}

    </div>
  );
}
