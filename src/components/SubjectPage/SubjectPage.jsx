import React, { useState, useEffect } from "react";
import "./SubjectPage.css";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import ListForm from "../ListForm/ListForm";
import ClockLoader from "react-spinners/ClockLoader";

//will fetch based on title
export default function SubjectPage() {
  const { subjectTitle, subjectId } = useParams();
  const [list, setList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(Array(list.length).fill(false));

  const fetchList = () => {
    axios
      .get(`http://localhost:8000/getLists/${subjectId}`, {
        withCredentials: true,
      })
      .then((list) => {
        setList(list.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchList();
  }, [location]);

  const [showInput, setShowInput] = useState(Array(list.length).fill(false));

  //Update UI when we add a new list
  const addNewList = () => {
    fetchList();
  };

  //Create a task
  const handleSubmit = (e, currentList) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/createTask/${currentList._id}`,
        {
          taskTitle,
        },
        { withCredentials: true }
      )
      .then((result) => {
        //Update the list to add to add the new list with tasks
        setList((list) =>
          list.map((lists) =>
            lists._id === currentList._id
              ? { ...lists, task: result.data.task }
              : lists
          )
        );
        setTaskTitle("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteList = (listId, index) => {
    axios
      .delete(`http://localhost:8000/list/deleteList/${listId}`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.status === 200) {
          setShowMenu((prevShowMenu) => [
            ...prevShowMenu.slice(0, index),
            false,
            ...prevShowMenu.slice(index + 1),
          ]);
          fetchList();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="subject-page">
      {loading ? (
        <div className="loading-screen">
          <ClockLoader color="#7552FF" size={150} />
        </div>
      ) : (
        <div className="subject-screen">
          <h1>{subjectTitle}</h1>
          <div className="subject-board">
            {/*All of below is just the UI for task form*/}
            {list.map((lists, index) => (
              <div className="list-margin list-content" key={`list_${index}`}>
                <div className="list-header">
                  <h3>{lists.listTitle}</h3>

                  <button
                    className="more-info-list"
                    onClick={() => {
                      const newShowMenu = [...showMenu];
                      newShowMenu[index] = !newShowMenu[index];
                      setShowMenu(newShowMenu);
                    }}
                  >
                    <i className="material-icons">more_horiz</i>
                  </button>

                  {showMenu[index] && (
                    <div className="mini-menu">
                      <div className="menu-header">
                        <h5>List actions</h5>

                        <button
                          className="close-mini-menu"
                          onClick={() =>
                            setShowMenu((prevShowMenu) => [
                              ...prevShowMenu.slice(0, index),
                              false,
                              ...prevShowMenu.slice(index + 1),
                            ])
                          }
                        >
                          <i className="material-icons">close</i>
                        </button>
                      </div>

                      <button
                        className="delete-list-button"
                        onClick={() => handleDeleteList(lists._id, index)}
                      >
                        Delete list
                      </button>
                    </div>
                  )}
                </div>

                <div className="task-container task-margins">
                  {Array.isArray(lists.task) &&
                    lists.task.map((task, taskIndex) => (
                      <div className="task-content" key={`task_${taskIndex}`}>
                        <Link
                          to={`/${task.title}/${task._id}`}
                          state={{
                            background: location,
                          }}
                          className="task-link"
                        >
                          <p>{task.title}</p>
                        </Link>
                      </div>
                    ))}
                </div>

                <div className="button-container">
                  <div className="task-form">
                    <div
                      className={
                        showInput[index] ? "task-input" : "add-new-task"
                      }
                      onClick={() => {
                        const newShowInput = [...showInput];
                        newShowInput[index] = !newShowInput[index];
                        setShowInput(newShowInput);
                      }}
                    >
                      {showInput[index] ? (
                        <form className="task-input">
                          <input
                            type="text"
                            placeholder="Enter a title for this task.."
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />

                          <div className="btn">
                            <button
                              className="add-task"
                              type="submit"
                              onClick={(e) => handleSubmit(e, lists)}
                            >
                              Add Task
                            </button>

                            <button
                              className="close-btn"
                              onClick={() => {
                                setShowInput((prevShowInput) => [
                                  ...prevShowInput.slice(0, index),
                                  false,
                                  ...prevShowInput.slice(index + 1),
                                ]);
                              }}
                            >
                              <i className="material-icons">close</i>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <i
                            className="material-icons"
                            onClick={() => {
                              const newShowInput = [...showInput];
                              newShowInput[index] = !newShowInput[index];
                              setShowInput(newShowInput);
                            }}
                          >
                            add
                          </i>
                          Add New Task
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <ListForm
              subjectId={subjectId}
              listAdded={addNewList}
            />
          </div>
        </div>
      )}
    </div>
  );
}
