import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TaskForm() {
  const [showInput, setShowInput] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [subtaskTitlÍe, setSubtaskTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { taskTitle, taskId } = useParams();
  const [title, setTitle] = useState(taskTitle);
  const [taskInfo, setTaskInfo] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/task/getTask/${taskId}`, {
        withCredentials: true,
      })
      .then((task) => {
        //console.log(task.data);
        setTaskInfo(task.data);
        setDescription(task.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  //will update the description & update it in the backend
  const updateDescription = (e, taskId) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/task/updateDescription/${taskId}`, {
        description,
      })
      .then((result) => {
        console.log(result.data.description);
        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          description: result.data.description,
        }));
        setDescription(result.data.description);
        setShowDescription(false);
        //console.log(taskInfo)
      })
      .catch((err) => console.log(err));
  };

  const createSubtask = (e, taskId) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/createSubtask/${taskId}`, {
        subtaskTitle,
      })
      .then((result) => {
        //console.log(result.data);

        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          subtask: [...prevTaskInfo.subtask, result.data],
        }));
        setSubtaskTitle("");
        
      })
      .catch((err) => console.log(err));
  };
  //Array.isArray(taskInfo.subtask)
  const [showDate, setShowDate] = useState(false);
  //const [showDate, setShowDate] = useState(Array(taskInfo.subtask.length).fill(false));
  /*
  const [showDate, setShowDate] = useState(() => {
    if (Array.isArray(taskInfo.subtask)){
      return Array(taskInfo.subtask.length).fill(false);
    }
    else{
      return "";
}})*/
  //console.log(taskInfo);

  return (
    <div className="task-page">
      <div className="task-popup-column">
        <div className="task-popup-container">
          <div className="header">
            <i className="material-icons">book</i>

            <textarea
              className="title-textarea"
              value={title}
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

              {showDescription ? (
                <form>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-description"
                  ></textarea>
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => updateDescription(e, taskId)}
                      value={description}
                    >
                      Save
                    </button>

                    <button onClick={() => setShowDescription(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className="text-description"
                  onClick={(e) => setShowDescription(true)}
                >
                  {description ? description : "Add a description"}
                </button>
              )}
            </div>

            <div className="popup-subtasks">
              <div className="subtask-header">
                <i className="material-icons">check_box</i>
                <h3>Subtask</h3>
              </div>
              <div className="subtask-list">
                {Array.isArray(taskInfo.subtask) &&
                  taskInfo.subtask.map((subtask, index) => (
                    <div className="subtask-container" key={`subtask_${index}`}>
                      <button
                        className="subtask-button"
                        onClick={() => setShowDate(true)}
                      >
                        <input
                          type="checkbox"
                          id="subtaskCheckbox"
                          value="subtask-box"
                        ></input>

                        <label htmlFor="subtask-box">
                          {subtask.subtaskTitle}
                        </label>
                      </button>
                    </div>
                  ))}

                  {showDate && (
                        <div>
                          <p>calendar</p>
                          <button onClick={() => setShowDate(false)}>
                            <i className="material-icons">close</i>
                          </button>
                        </div>
                      )}
              </div>

              {showInput ? (
                <form className="subtask-input">
                  <input
                    type="text"
                    placeholder="Enter subtask title"
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                  />

                  <div className="task-options">
                    <button
                      type="button"
                      onClick={(e) => createSubtask(e, taskId)}
                    >
                      Add
                    </button>
                    <button onClick={() => setShowInput(false)}>Cancel</button>
                  </div>
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

              <button type="submit">Save</button>
              <button>Close</button>
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
