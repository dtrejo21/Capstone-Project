import * as React from "react"
import "./CardForm.css"

export default function CardForm({handleInputChange, inputValue, showInput, handleButton}){
    return(
        <div className="card-form">
            {showInput ? (
                <form>
                    <input type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Add Class</button>
                </form>
            ) : (
                <button onClick={handleButton}>
                    <i className="material-icons">add</i>
                    Enter Class Name...
                </button>
            )}
        </div>
    )
}