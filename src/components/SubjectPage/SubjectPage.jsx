import React, { useState, useEffect } from "react";
import "./SubjectPage.css";
import { useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import ListForm from "../ListForm/ListForm";

//will fetch based on title
export default function SubjectPage() {
  const { subjectTitle, subjectId } = useParams();
  const [list, setList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getLists/${subjectId}`, {
        withCredentials: true,
      })
      .then((list) => setList(list.data))
      .catch((err) => console.log(err));
  }, []);

  const [showInput, setShowInput] = useState(Array(list.length).fill(false));

  const addNewList = (newList) => {
    setList([...list, newList]);
  };

  //Create a task
  const handleSubmit = (e, currentList) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/createTask/${currentList._id}`, { taskTitle })
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

  return (
    <div className="subject-page">
      <h1>{subjectTitle}</h1>

      <div className="subject-board">
        {/*All of below is just the UI for task form*/}
        {list.map((lists, index) => (
          <div className="list-margin list-content" key={`list_${index}`}>
            <div className="header">
              <h3>{lists.listTitle}</h3>
            </div>

            <div className="task-container task-margins">
                {lists.task.map((task, taskIndex) => (
                  <div className="task-content" key={`task_${taskIndex}`}>
                    <Link to={`/${task.title}/${task._id}`}
                          state={{background: location}}
                          className="task-link">
                      <p>{task.title}</p>
                    </Link>
                    
                  </div>
                ))}
            </div>

            <div className="button-container">
              <div className="task-form">
                <div
                  className={showInput[index] ? "task-input" : "add-new-task"}
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
          listAdded={(newList) => addNewList(newList)}
        />
      </div>
    </div>
  );
}
