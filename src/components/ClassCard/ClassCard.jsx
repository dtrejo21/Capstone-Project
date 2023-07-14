import * as React from "react"
import "./ClassCard.css"
import { useState } from "react"
//HTML Drag and Drop API

//this is the component that will show the indvidual card
//which will show name, some tasks, and the option to add
//a new task
export default function ClassCard(){
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [classes, setClasses] = useState("");

    return(
        <div className="class-card">
            <div className="content">
                <h4>Class #1</h4>
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
            </div>

            <div className="addTask">
                    {showInput ? (
                        <form className="inputTask">
                            <input type="text"
                                placeholder="Enter a title for this task.."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit">Add Task</button>

                            <button className="close">
                                <i className="material-icons">close</i>
                            </button>
                        </form>
                    ) : (
                        <button className="taskBtn" >
                            <i className="material-icons">add</i>
                            Add New Task
                        </button>
                    )}
                </div>
        </div>
    )
}