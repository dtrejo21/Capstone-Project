import React, { useState } from "react";
import "./ListForm.css";
import axios from "axios";

export default function ListForm({ subjectId, listAdded }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/updateList/${subjectId}`, { title })
      .then((result) => {
        console.log(result.data);
        listAdded(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="list-form">
      {showInput ? (
        <form className="list-input">
          <input
            type="text"
            placeholder="Enter list title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="buttons" onClick={handleSubmit}>
            <button className="add-list" type="submit">
              Add List
            </button>

            <button className="exitBtn" onClick={() => setShowInput(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
        </form>
      ) : (
        <button className="add-another" onClick={() => setShowInput(true)}>
          <i className="material-icons">add</i>
          Add another list
        </button>
      )}
    </div>
  );
}
