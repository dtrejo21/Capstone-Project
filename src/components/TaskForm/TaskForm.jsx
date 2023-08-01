import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import CalendarPopup from "../CalendarPopup/CalendarPopup";

export default function TaskForm() {
  const [showInput, setShowInput] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSubtaskDate, setShowSubtaskDate] = useState(null);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null);

  const navigate = useNavigate();

  const { taskTitle, taskId } = useParams();
  const [title, setTitle] = useState(taskTitle);
  const [taskInfo, setTaskInfo] = useState([]);

  const handleSubtaskClose = () => {
    setShowSubtaskDate(null);
  };

  const handleTaskClose = () => {
    setShowTaskDate(null);
  };

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
        //console.log(result.data.description);
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

  const handleSubtaskDateSubmit = (startDate, subtaskId) => {
    const dueDate = new Date(startDate);
    axios
      .post(`http://localhost:8000/task/addSubtaskDueDate/${subtaskId}`, {
        dueDate: dueDate,
      })
      .then((result) => {
        //console.log(result.data);
        //update the state to include the new due date for subtask
        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          subtask: prevTaskInfo.subtask.map((subtask) =>
            subtask._id === subtaskId
              ? { ...subtask, dueDate: result.data.dueDate }
              : subtask
          ),
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleTaskDateSubmit = (startDate, taskId) => {
    console.log(startDate);

    const dueDate = new Date(startDate);
    console.log(dueDate);
    axios
      .post(`http://localhost:8000/task/addTaskDueDate/${taskId}`, {
        dueDate: dueDate,
      })
      .then((result) => {
        console.log(result);
        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          dueDate: result.data.dueDate,
        }));
        //console.log(taskInfo)
      })
      .catch((err) => console.log(err));
  };

  const formatDueDate = (date) => {
    if (date === null) {
      return null;
    } else {
      const dueDate = new Date(date);
      const format = { month: "long", day: "numeric" };
      return dueDate.toLocaleString("en-US", format);
    }
  };

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
            {taskInfo.dueDate ? (
              <div className="task-duedate">
                <h5>Due Date:</h5>
                <p>{formatDueDate(taskInfo.dueDate)}</p>
              </div>
            ) : (
              <></>
            )}

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
                  <div className="description-options">
                    <button
                      type="submit"
                      value={description}
                      className="save-description"
                      onClick={(e) => updateDescription(e, taskId)}
                    >
                      Save
                    </button>

                    <button className="cancel-description" onClick={() => setShowDescription(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className="text-description"
                  onClick={() => setShowDescription(true)}
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
                    <div className="subtask-wrapper" key={`subtask_${index}`}>
                      <div className="subtask-container">
                        <input
                          type="checkbox"
                          id="subtaskCheckbox"
                          value="subtask-box"
                        ></input>

                        <button
                          className="subtask-button"
                          onClick={() => setSelectedSubtask(subtask)}
                        >
                          <div className="subtask-title">
                            <label htmlFor="subtask-box">
                              {subtask.subtaskTitle}
                            </label>
                          </div>

                          <div className="subtask-duedate">
                            <p>{formatDueDate(subtask.dueDate)}</p>
                          </div>
                        </button>
                      </div>

                      {selectedSubtask === subtask && (
                        <div className="subtask-options">
                          <button
                            className="subtask-date"
                            onClick={() => setShowSubtaskDate(selectedSubtask)}
                          >
                            Date
                          </button>

                          <button className="subtask-close">
                            <i
                              className="material-icons"
                              onClick={() => setSelectedSubtask(null)}
                            >
                              close
                            </i>
                          </button>

                          <button className="delete-subtask">
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                      )}

                      {showSubtaskDate === subtask && (
                        <CalendarPopup
                          handleClose={handleSubtaskClose}
                          onSubmit={handleSubtaskDateSubmit}
                          id={subtask._id}
                        />
                      )}
                    </div>
                  ))}
              </div>

              {showInput ? (
                <form className="subtask-input">
                  <input
                    type="text"
                    placeholder="Enter subtask title"
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                  />

                  <div className="create-subtask-options">
                    <button
                      type="button"
                      className="add-subtask"
                      onClick={(e) => createSubtask(e, taskId)}
                    >
                      Add
                    </button>
                    <button className="cancel-subtask" onClick={() => setShowInput(false)}>Cancel</button>
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
              <div className="option-buttons">
                <button
                  className="popup-date"
                  onClick={() => setShowTaskDate(true)}
                >
                  Date
                </button>

                {showTaskDate && (
                  <CalendarPopup
                    handleClose={handleTaskClose}
                    onSubmit={handleTaskDateSubmit}
                    id={taskId}
                  />
                )}

                <button className="delete-task">
                  Delete
                </button>
              </div>
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
