import * as React from "react"
import "./SubjectPage.css"
import { useParams } from "react-router-dom"

//will fetch based on title
export default function SubjectPage(props){
    const { title } = useParams();
    return(
        <div className="subject-page">
            <div className="lists">

            </div>
        </div>
    );
};