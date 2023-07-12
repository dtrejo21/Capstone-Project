import * as React from "react"
import "./StudySpace.css"

export default function StudySpace({isOpen, handleToggle}){
    return(
        <div className={isOpen ? "study-space": "study-space hidden"}>
            <button>Study Space
                <i className="material-icons">chevron_right</i>
            </button>
        </div>
    )
}