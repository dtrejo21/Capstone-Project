import * as React from "react"
import "./Classes.css"
import ClassCard from "../ClassCard/ClassCard"
//This is the component that will go thru the database
//to display all of the classes neatly
export default function Classes({isOpen, handleClick, handleInputChange, inputValue, showInput, handleButton}){
    return(
        /*
        <div className={isOpen ? "class": "class hidden"}>
            <button>Classes
                <i className="material-icons">chevron_right</i>
            </button>
        </div>*/
        <div className="classes">
            <ClassCard isOpen={isOpen}
                       handleClick={handleClick}
                       handleInputChange={handleInputChange}
                       inputValue={inputValue} showInput={showInput}
                       handleButton={handleButton}/>
        </div>
    )
}