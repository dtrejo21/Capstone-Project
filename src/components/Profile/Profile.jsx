import * as React from "react"
import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/welcome");
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/getUser")
            .then(response => setUser(response.data))
            .catch(err => console.log(err))
    }, [])
    /*
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {}, [userInfo]);
*/
    
    const chosen = user[0];
    console.log({user});
    return(
        <div className="profile">
            <div className="menu">
                <div className="options">
                    <p>Profile</p>
                    <p>Account Settings</p>
                    <p>Notifications</p>
                    <div className="delete-account">
                        <p>Delete Account</p>
                    </div>
                </div>
            </div>

            <div className="profile-info">
                <h2>Profile</h2>
                <p>Name: </p>
                <p>Email: </p>

                <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    )
}