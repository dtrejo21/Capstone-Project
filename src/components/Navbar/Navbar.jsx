import * as React from "react"
import "./Navbar.css"
import { useState } from "react"

export default function Navbar(){
    const [menuVisble, setMenuVisble] = useState(false);
    const handleLogout = () => {

    }

    return(
        <div className="navbar">
            <div className="content">
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


                <button className="profile" onClick={() => setMenuVisble(true)}>
                    <i className="material-icons">account_circle</i>
                    
                    {/*{menuVisble && 
                        <div className="menu">
                            <button>
                                Logout
                            </button>
                    </div>}*/}
                    
                </button>

            </div>
                
            
        </div>
    )
}