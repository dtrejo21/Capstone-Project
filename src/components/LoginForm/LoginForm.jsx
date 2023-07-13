import * as React from "react"
import "./LoginForm.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //axios.defaults.withCredentials = true;
    /*
    const handleLogin = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5173/login", {email, password})
        .then(res => {
            }
        }).catch(err => console.log(er))
    }*/

    return(
        <div className="login">
            <form className="login-form">
                <h2>Login</h2>

                <div className="form-content">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                    />
                </div>

                <div className="form-content">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />
                </div>
                <button type="submit">Login</button>
                <p>
                    New to the app? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
            
        </div>
    )
}