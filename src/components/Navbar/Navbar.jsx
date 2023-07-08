import * as React from "react"
import "./Navbar.css"

export default function Navbar(){

    return(
        <div className="navbar">
            <li>
                <i className="material-icons">search</i>
            </li>
            <li>
                <i className="material-icons">calendar_today</i>
            </li>
            <li>
                <i className="material-icons">add</i>
            </li>
            <li>
                <i className="material-icons">help</i>
            </li>
            
        </div>
    )
}