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

  const [subtaskType, setSubtaskType] = useState(null);
  const [subtaskId, setSubtaskId] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [showSuggestedDate, setShowSuggestedDate] = useState(false);
  const [estimatedDate, setEstimatedDate] = useState("");

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
    const parentId = subtaskType === "subtask" ? subtaskId : taskId;
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/task/updateDescription/${parentId}/${subtaskType}`,
        {
          description,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (subtaskType === "subtask") {
          //console.log(result.data);
          const { description } = result.data;
          setTaskInfo({ description: description });
        } else {
          setTaskInfo((prevTaskInfo) => ({
            ...prevTaskInfo,
            description: result.data.description,
          }));
          console.log("Description: ", result.data.description);
          setDescription(result.data.description);
        }
        setShowDescription(false);
      })
      .catch((err) => console.log(err));
  };

  const createSubtask = (e, taskId) => {
    const parentId = subtaskType === "subtask" ? subtaskId : taskId;
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/createSubtask/${parentId}/${subtaskType}`,
        {
          subtaskTitle,
        },
        { withCredentials: true }
      )
      .then((result) => {
        //console.log(subtaskType);
        if (subtaskType === "subtask") {
          //console.log(result.data);
          setTaskInfo({ dueDate: dueDate, subtask: result.data });
        } else {
          setTaskInfo((prevTaskInfo) => ({
            ...prevTaskInfo,
            subtask: [...prevTaskInfo.subtask, result.data],
          }));
        }
        setSubtaskTitle("");
      })
      .catch((err) => console.log(err));
  };

  const handleSubtaskDateSubmit = (startDate, subtaskId) => {
    const dueDate = new Date(startDate);
    axios
      .post(
        `http://localhost:8000/task/addSubtaskDueDate/${subtaskId}`,
        {
          dueDate: dueDate,
        },
        { withCredentials: true }
      )
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
    const parentId = subtaskType === "subtask" ? subtaskId : taskId;

    const dueDate = new Date(startDate);
    //console.log(dueDate);
    axios
      .post(
        `http://localhost:8000/task/addTaskDueDate/${parentId}/${subtaskType}`,
        {
          dueDate: dueDate,
        },
        { withCredentials: true }
      )
      .then((result) => {
        //console.log(result.data);
        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          dueDate: result.data.dueDate,
        }));
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

  const formatDueDateHover = (date) => {
    if (date === null) {
      return null;
    }
    const dueDate = new Date(date).getTime();
    //console.log(dueDate);
    const currentDate = new Date();
    const remainingTime = dueDate - currentDate.getTime();
    const numOfHours = remainingTime / (1000 * 60 * 60);
    if (numOfHours > 24) {
      const numOfDays = numOfHours / 24;
      return `${Math.floor(numOfDays)} days remaining`;
    } else {
      return `${Math.floor(numOfHours)} hours remaining`;
    }
  };

  const handleSubtaskDetails = (subtaskId) => {
    axios
      .get(`http://localhost:8000/getSubtask/${subtaskId}`, {
        withCredentials: true,
      })
      .then((result) => {
        //destruct the data
        const { subtaskTitle, description, dueDate, _id } = result.data[0];
        //Set the new information
        setSubtaskType(result.data.type);
        setDueDate(dueDate);
        setSubtaskId(_id);
        setTitle(subtaskTitle);
        setDescription(description);
        setTaskInfo({ dueDate: dueDate, subtask: result.data.children });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSubtask = (subtaskId) => {
    const parentId = subtaskId;
    axios
      .delete(
        `http://localhost:8000/deleteSubtask/${parentId}/${subtaskType}`,
        { withCredentials: true }
      )
      .then((result) => {
        if (subtaskType === "subtask") {
          //console.log(result);
          setTaskInfo((prevTaskInfo) => ({
            ...prevTaskInfo,
            subtask: prevTaskInfo.subtask.filter(
              (subtask) => subtask._id !== subtaskId
            ),
          }));
        } else {
          //console.log(result);
          setTaskInfo((prevTaskInfo) => ({
            ...prevTaskInfo,
            subtask: prevTaskInfo.subtask.filter(
              (subtask) => subtask._id !== subtaskId
            ),
          }));
        }
      });
  };

  //Will handle deleting a task, whether a subtask or a task parent
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8000/deleteTask/${taskId}`, {withCredentials: true})
    .then(result => {
      if(result.status === 200){
        navigate(-1, {state: {taskDeleted: true}});
      }
    })
    .catch(err => console.log(err))
  }

  //Handles the event when a checkbox is checked
  const handleComplete = (subtaskId, newIsCompleted) => {
    axios
      .post(
        `http://localhost:8000/subtask/updateComplete/${subtaskId}`,
        {
          isCompleted: newIsCompleted,
        },
        { withCredentials: true }
      )
      .then((result) => {
        setTaskInfo((prevTaskInfo) => ({
          ...prevTaskInfo,
          subtask: prevTaskInfo.subtask.map((subtask) =>
            subtask._id === subtaskId
              ? { ...subtask, isCompleted: result.data.isCompleted }
              : subtask
          ),
        }));
      })
      .catch((err) => console.log(err));
  };

  //Will set a timeout, which will run the algorithm after time is up, if we're on the input
  useEffect(() => {
    if (isInputFocus) {
      const timeoutId = setTimeout(() => suggestedTime(subtaskTitle), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [subtaskTitle, isInputFocus]);

  const suggestedTime = (title) => {
    //Run the comparison algorithm when time is out

    axios
      .get(
        "http://localhost:8000/suggestedTime",
        { params: { title } },
        { withCredentials: true }
      )
      .then((result) => {
        //console.log(result);
        //If we get a successful result
        if (result.status === 200) {
          //console.log(result.data);
          setShowSuggestedDate(true);

          //give a date based of the estimate
          const newDate = new Date(
            Date.now() + result.data * 24 * 60 * 60 * 1000
          );
          //console.log(newDate);
          setEstimatedDate(formatDueDate(newDate));
        } else {
          setShowSuggestedDate(false);
        }
      })
      .catch((err) => console.log(err));
  };

  //Handle the return button, will return to the previous subtask
  const handleReturn = () => {
    const parentId = subtaskId;

    axios
      .get(`http://localhost:8000/returnToPrevious/${parentId}`, {
        withCredentials: true,
      })
      .then((result) => {
        //console.log(result.data);
        if (result.data.type === "subtask") {
          const { subtaskTitle, description, dueDate, _id } =
            result.data.prevSubtask;
          //Set the new information
          setSubtaskType(result.data.type);
          setDueDate(dueDate);
          setSubtaskId(_id);
          setTitle(subtaskTitle);
          setDescription(description);
          setTaskInfo({ dueDate: dueDate, subtask: result.data.children });
        } else {
          //Return UI to parent task
          setSubtaskType(null);
          setTitle(result.data.title);
          setDescription(result.data.description);
          setTaskInfo(result.data);
        }
      });
  };

  return (
    <div className="task-page">
      <div className="task-popup-column">
        <div className="task-popup-container">
          <div className="header">
            {subtaskType === "subtask" && (
              <button onClick={handleReturn} className="return-button">
                <i className="material-icons">arrow_back</i>
              </button>
            )}

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
                <div className="invisible">
                  <p>{formatDueDateHover(taskInfo.dueDate)}</p>{" "}
                </div>
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

                    <button
                      className="cancel-description"
                      onClick={() => setShowDescription(false)}
                    >
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
                      <div
                        className={`subtask-container ${
                          subtask.isCompleted ? "crossed-out" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={`subtask_${subtask._id}`}
                          checked={subtask.isCompleted} //this will refer to the schema
                          onChange={() =>
                            handleComplete(subtask._id, !subtask.isCompleted)
                          }
                        ></input>

                        <button
                          className="subtask-button"
                          onClick={() => setSelectedSubtask(subtask)}
                        >
                          <div className="subtask-title">
                            <label htmlFor={`subtask_${subtask._id}`}>
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

                          <button
                            className="delete-subtask"
                            onClick={() => handleDeleteSubtask(subtask._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>

                          <button
                            onClick={() => handleSubtaskDetails(subtask._id)}
                          >
                            Add Details
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
                    onBlur={() => setIsInputFocus(false)}
                    onFocus={() => setIsInputFocus(true)}
                  />

                  <div className="create-subtask-options">
                    <button
                      type="button"
                      className="add-subtask"
                      onClick={(e) => createSubtask(e, taskId)}
                    >
                      Add
                    </button>
                    <button
                      className="cancel-subtask"
                      onClick={() => setShowInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  {showSuggestedDate && (
                    <div className="estimated-dueDate">
                      <div className="suggestion-header">
                        <button
                          className="close-suggested-date"
                          onClick={() => setShowSuggestedDate(false)}
                        >
                          <i className="material-icons">close</i>
                        </button>
                      </div>
                      <p>Estimated time of completion: {estimatedDate}</p>
                    </div>
                  )}
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

                {subtaskType === null && (
                  <button className="delete-task" onClick={() => handleDeleteTask(taskInfo._id)}>Delete</button>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
