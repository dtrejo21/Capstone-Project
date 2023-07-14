import * as React from "react"
import "./CardForm.css"
import { useState } from "react"

export default function CardForm(){
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return(
        <div className="card-form">
            {showInput ? (
                <form className="card-input">
                    <input type="text"
                        placeholder="Enter class title.."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <div className="buttons">
                        <button id="add-class" type="submit">Add Class</button>

                        <button className="exitBtn" onClick={() => setShowInput(false)}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                </form>
            ) : (
                <button className="add" onClick={() => setShowInput(true)}>
                    <i className="material-icons">add</i>
                    Add anoter class
                </button>
            )}
        </div>
    )
}