import * as React from "react"
import "./Sidebar.css"
import Calendar from "../Calendar/Calendar"
import StudySpace from "../StudySpace/StudySpace"


export default function Sidebar({isOpen, handleToggle}){

    return(
        <section className={isOpen ? "sidebar open": "sidebar close"}>
            <button className="toggle-button" onClick={handleToggle}>
                <i className="material-icons">menu</i>
            </button>


                <div className="options">
                     {/*}
                    <Classes isOpen={isOpen} 
    handleToggle={handleToggle}/>*/}

                    <Calendar isOpen={isOpen}
                            handleToggle={handleToggle}/>
                    
                    <StudySpace isOpen={isOpen}
                                handleToggle={handleToggle}/>
                </div>

        </section>
    )
}