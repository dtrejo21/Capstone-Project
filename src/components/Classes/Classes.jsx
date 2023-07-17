import * as React from "react"
import "./Classes.css"
import ClassCard from "../ClassCard/ClassCard"
import CardForm from "../CardForm/CardForm"

//This is the component that will go thru the database
//to display all of the classes neatly
export default function Classes(){
    return(
        <div className="classes">
            <ClassCard/>
        </div>
    )
}