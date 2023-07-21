import React, {useState} from "react"
import "./SubjectPage.css"
import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar";

//will fetch based on title
export default function SubjectPage(props){
    const { title } = useParams();

    return(
        <div className="subject-page">
            <h1>{title}</h1>
            <div className="lists">
                
            </div>
        </div>
    );
};