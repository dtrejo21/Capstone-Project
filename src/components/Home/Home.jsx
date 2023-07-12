import * as React from "react"
import "./Home.css"
import Classes from "../Classes/Classes"

//this is the home page, where you see all of the classes
//displayed, and where you have to call classes
export default function Home({isOpen, handleClick, handleInputChange, inputValue, showInput, handleButton}){
    return(
        <div className="home">
            <h2>Workspace</h2>
            <Classes isOpen={isOpen}
                     handleClick={handleClick}
                     handleInputChange={handleInputChange}
                     inputValue={inputValue} showInput={showInput}
                     handleButton={handleButton}/>
        </div>
    )
}