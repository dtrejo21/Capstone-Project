import * as React from "react";
import "./CardForm.css";
import { useState } from "react";
import axios from "axios";

export default function CardForm({subjectAdded}){
    const [showInput, setShowInput] = useState(false);
    const [subjectTitle, setSubjectTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/createSubject", {subjectTitle}, {withCredentials: true})
        .then(result => {
            subjectAdded(result.data);
            setSubjectTitle("");
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="card-form">
            {showInput ? (
                <form className="card-input">
                    <input type="text"
                        placeholder="Enter class title.."
                        value={subjectTitle}
                        onChange={(e) => setSubjectTitle(e.target.value)}
                    />

          <div className="buttons">
            <button className="submitBtn" type="submit" onClick={handleSubmit}>
              Add Class
            </button>

            <button className="exitBtn" onClick={() => setShowInput(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
        </form>
      ) : (
        <button className="addBtn" onClick={() => setShowInput(true)}>
          <i className="material-icons">add</i>
          Add another class
        </button>
      )}
    </div>
  );
}
