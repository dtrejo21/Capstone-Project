import * as React from "react"
import "./ClassCard.css"
import { useState, useEffect } from "react"
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import { Link } from "react-router-dom";
//HTML Drag and Drop API

//this is the component that will show the indvidual card
//which will show name, some tasks, and the option to add
//a new task
export default function ClassCard(){
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [subject, setSubject] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/getSubject")
        .then(subject => 
            setSubject(subject.data)
        )
        .catch(err => console.log(err))
    }, [])

    const addNewSubject = (newSubject) => {
        setSubject([...subject, newSubject])
    }

    const [showMenu, setShowMenu] = useState(Array(subject.length).fill(false));

    return(
        <div className="class-card">
            {
                subject.map((subjects, index) => (
                    <div className="subject" key={`subject_${index}`}> 
                        <div className="header">
                            <Link to={`/subjects/${subjects.title}`}>{/* This is defaults to Workspace*/}
                                <h3>{subjects.title}</h3>
                            </Link>
                            
                            <button className="material-icons" 
                                    onClick={() => {
                                        const newShowMenu = [...showMenu];
                                        newShowMenu[index] = !newShowMenu[index];
                                        setShowMenu(newShowMenu);
                                    }}>
                                more_horiz
                            </button>

                            {showMenu[index] && 
                                <div className="mini-menu">
                                    <div className="header">
                                        <h5>List actions</h5>
                                        <button className="material-icons" 
                                                onClick={() => setShowMenu(prevShowMenu => 
                                                    [...prevShowMenu.slice(0, index), 
                                                    false, 
                                                    ...prevShowMenu.slice(index + 1)])}>
                                            close
                                        </button>
                                    </div>
                                    
                                    <button>
                                        Delete list
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                ))
            }
            
            <CardForm subjectAdded={(newSubject) => addNewSubject(newSubject)}/>
            {/*
            <div className="tasks">
                <div className="tasksList">
                    <input type="checkbox" id="box1"/>                            
                    <label htmlFor="box1">Task #1</label>
                </div>

               <div className="tasksList2">
                   <input type="checkbox" id="box2"/>
                    <label htmlFor="box2">Task #2</label>
                </div>   
            </div>
                
            <div className="task-form">
                {showInput ? (
                    <form className="task-input">
                        <input type="text"
                            placeholder="Enter a title for this task.."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <div className="btn">
                            <button className="add-task" type="submit">Add Task</button>

                            <button className="exitBtn" onClick={() => setShowInput(false)}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                    </form>
                ) : (
                    <button className="taskBtn" onClick={() => setShowInput(true)}>
                        <i className="material-icons">add</i>
                        Add New Task
                    </button>
                )}
            </div>
                */}
     </div>
    )
}