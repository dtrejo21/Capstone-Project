import * as React from "react";
import "./ClassCard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import { Link } from "react-router-dom";

//Will display all subjects and subject form
export default function ClassCard() {
  const [subject, setSubject] = useState([]);

  const fetchSubject = () => {
    axios
      .get("http://localhost:8000/getSubject", { withCredentials: true })
      .then((subject) => {
        //console.log(subject.data)
        setSubject(subject.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSubject();
  }, [])

  const addNewSubject = (newSubject) => {
    setSubject((subject) => [...subject, newSubject]);
  };

  const [showMenu, setShowMenu] = useState(Array(subject.length).fill(false));

  //Will delete a subject and any chlildren
  const handleDeleteSubject = (subjectId, index) => {
    axios
      .delete(`http://localhost:8000/subject/deleteSubject/${subjectId}`, {
        withCredentials: true,
      })
      .then((result) => {
        setShowMenu((prevShowMenu) => [
          ...prevShowMenu.slice(0, index),
          false,
          ...prevShowMenu.slice(index + 1),
        ]);
        fetchSubject();
      })
      .catch(error => console.log)
  };

  return (
    <div className="class-card card-details">
      {Array.isArray(subject) &&
        subject.map((subjects, index) => (
          <div className="subject" key={`subject_${index}`}>
            <div className="header">
              <Link to={`/subjects/${subjects.subjectTitle}/${subjects._id}`}>
                <h3>{subjects.subjectTitle}</h3>
              </Link>

              <button
                className="subject-more-info"
                onClick={() => {
                  const newShowMenu = [...showMenu];
                  newShowMenu[index] = !newShowMenu[index];
                  setShowMenu(newShowMenu);
                }}
              >
                <i className="material-icons">more_horiz</i>
              </button>

              {showMenu[index] && (
                <div className="mini-menu">
                  <div className="subject-menu-header">
                    <h5>List actions</h5>
                    <button
                      className="close-subject-mini-menu"
                      onClick={() =>
                        setShowMenu((prevShowMenu) => [
                          ...prevShowMenu.slice(0, index),
                          false,
                          ...prevShowMenu.slice(index + 1),
                        ])
                      }
                    >
                      <i className="material-icons">close</i>
                    </button>
                  </div>

                  <button
                    className="delete-subject-button"
                    onClick={() => handleDeleteSubject(subjects._id, index)}
                  >
                    Delete list
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

      <CardForm subjectAdded={(newSubject) => addNewSubject(newSubject)} />
    </div>
  );
}
