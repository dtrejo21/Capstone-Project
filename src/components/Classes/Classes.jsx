import * as React from "react"
import "./Classes.css"
import ClassCard from "../ClassCard/ClassCard"
import CardForm from "../CardForm/CardForm"

//This is the component that will go thru the database
//to display all of the classes neatly
export default function Classes({isOpen, handleClick}){
    return(
        /*
        <div className={isOpen ? "class": "class hidden"}>
            <button>Classes
                <i className="material-icons">chevron_right</i>
            </button>
        </div>*/
        <div className="classes">
            <ClassCard/>
            <CardForm/>
            
        </div>
    )
}