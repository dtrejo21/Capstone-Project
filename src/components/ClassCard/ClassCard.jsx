import * as React from "react"
import "./ClassCard.css"
//HTML Drag and Drop API

//this is the component that will show the indvidual card
//which will show name, some tasks, and the option to add
//a new task
export default function ClassCard({isOpen, handleClick, handleInputChange, inputValue, showInput, handleButton}){
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

                <div className="addTask">
                    {showInput ? (
                        <form>
                            <input type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <button type="submit">Add Task</button>
                        </form>
                    ) : (
                        <button onClick={handleButton}>
                            <i className="material-icons">add</i>
                            Add New Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}