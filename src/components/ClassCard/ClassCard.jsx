import * as React from "react"
import "./ClassCard.css"
import { useState, useEffect } from "react"
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import { Link } from "react-router-dom";
//HTML Drag and Drop API

//this is the component that will show the indvidual card
//which will show name, some tasks, and the option to add
//a new task
export default function ClassCard() {
  const [subject, setSubject] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/getSubject")
        .then(subject => 
            setSubject(subject.data)
        )
        .catch(err => console.log(err))
    }, [])

    const addNewSubject = (newSubject) => {
        setSubject([...subject, newSubject])
    }

  const [showMenu, setShowMenu] = useState(Array(subject.length).fill(false));

    return(
        <div className="class-card">
            {
                subject.map((subjects, index) => (
                    <div className="subject" key={`subject_${index}`}> 
                        <div className="header">
                            <Link to={`/subjects/${subjects.title}`}>{/* This is defaults to Workspace*/}
                                <h3>{subjects.title}</h3>
                            </Link>
                            
                            <button className="material-icons" 
                                    onClick={() => {
                                        const newShowMenu = [...showMenu];
                                        newShowMenu[index] = !newShowMenu[index];
                                        setShowMenu(newShowMenu);
                                    }}>
                                more_horiz
                            </button>

            {showMenu[index] && (
              <div className="mini-menu">
                <div className="header">
                  <h5>List actions</h5>
                  <button
                    className="material-icons"
                    onClick={() =>
                      setShowMenu((prevShowMenu) => [
                        ...prevShowMenu.slice(0, index),
                        false,
                        ...prevShowMenu.slice(index + 1),
                      ])
                    }
                  >
                    close
                  </button>
                </div>

                <button>Delete list</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <CardForm subjectAdded={(newSubject) => addNewSubject(newSubject)} />
    </div>
  );
}
