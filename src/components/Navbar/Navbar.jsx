import * as React from "react"
import "./Navbar.css"

export default function Navbar(){

    return(
        <div className="navbar">
            <div className="searchbar">
                <input type="text" placeholder="Search"></input>
                <button>
                    <i className="material-icons">search</i>
                </button>
            </div>

            <button>
                <i className="material-icons">calendar_today</i>
            </button>

            <button>
                <i className="material-icons">add</i>
            </button>

            <button>
                <i className="material-icons">help</i>
            </button>

            <button>
                <i className="material-icons">account_circle</i>
            </button>
            
        </div>
    )
}