import * as React from "react"
import "./Sidebar.css"
import Calendar from "../Calendar/Calendar"
import StudySpace from "../StudySpace/StudySpace"
import { Link } from "react-router-dom"


export default function Sidebar({isOpen, handleToggle}){

    return(
        <section className={isOpen ? "sidebar open": "sidebar close"}>
            <button className="toggle-button" onClick={handleToggle}>
                <i className="material-icons">menu</i>
            </button>

            {isOpen && (
                <ul>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/calendar">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/study-space">Study Space</Link>
                    </li>
                </ul>
            )}

                    {/*
                    <Calendar isOpen={isOpen}/>
                    
                    <StudySpace isOpen={isOpen}
                                handleToggle={handleToggle}/>
    */}

        </section>
    )
}