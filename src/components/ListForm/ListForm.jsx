import React, { useState } from "react";
import "./ListForm.css";
import axios from "axios";

export default function ListForm({ subjectId, listAdded }) {
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/updateList/${subjectId}`, { listTitle }, {withCredentials: true})
      .then((result) => {
        console.log(result.data);
        listAdded(result.data);
        setListTitle("");
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
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
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
