import React, { useState } from "react";
import "./TaskForm.css";
import { useNavigate, useParams } from "react-router";

export default function TaskForm() {
  const [showInput, setShowInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [description, setDescription] = useState("Add a description");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const { taskTitle, taskId } = useParams();

  return (
    <div className="task-page">
      <div className="task-popup-column">
        <div className="task-popup-container">
          <div className="header">
            <i className="material-icons">book</i>

            <textarea
              className="title-textarea"
              value={taskTitle}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>

            <button className="material-icons" onClick={() => navigate(-1)}>
              close
            </button>
          </div>

          <div className="popup-main-content">
            <div className="popup-description">
              <div className="description-header">
                <i className="material-icons"> edit_note</i>
                <h3>Description</h3>
              </div>
              <textarea
                className="textarea-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="popup-subtasks">
              <div className="subtask-header">
                <i className="material-icons">check_box</i>
                <h3>Subtask</h3>
              </div>

              {showInput ? (
                <form className="subtask-input">
                  <input
                    type="text"
                    placeholder="Enter subtask title"
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                  />
                </form>
              ) : (
                <button
                  className="create-subtask"
                  onClick={() => setShowInput(true)}
                >
                  <i className="material-icons">add</i>
                  Create a subtask
                </button>
              )}
            </div>

            <div className="popup-duedate">
              <h3>Due Date</h3>
              <input type="datetime-local"></input>
            </div>

            <div className="popup-estimate">
              <h3>Estimate</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
