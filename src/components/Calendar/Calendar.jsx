import * as React from "react"
import "./Calendar.css"

export default function Calendar({isOpen, handleToggle}){
    return(
        <div className={isOpen ? "calendar": "calendar hidden"}>
             <button>Calendar
                <i className="material-icons">chevron_right</i>
            </button>
        </div>
       
    )
}