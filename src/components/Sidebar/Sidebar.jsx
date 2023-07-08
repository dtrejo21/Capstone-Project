import * as React from "react"
import "./Sidebar.css"

export default function Sidebar({isOpen, handleToggle}){

    return(
        <section className={isOpen ? "sidebar open": "sidebar hidden"}>
            <button className="toggle-button" onClick={handleToggle}>
                <i className="material-icons">menu</i>
            </button>

            <div className={isOpen ? "options": "options hidden"}>
                <button>Classes
                    <i className="material-icons">chevron_right</i>
                </button>
                <button>Calendar
                    <i className="material-icons">chevron_right</i>
                </button>
                <button>Study Space
                    <i className="material-icons">chevron_right</i>
                </button>
            </div>
        </section>
    )
}