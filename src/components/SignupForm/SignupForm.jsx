import * as React from "react"
import "./SignupForm.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { UserContext } from "../../UserContext"

export default function SignupForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/signup", {username, email, password})
        .then(result => {console.log(result)
            updateUser(result.data)
            navigate("/")
        })
        .catch(err => console.log(err))
    };

    return(
        <div className="signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="form-content">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-content">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                
                <button type="submit">Sign Up</button>
                {/*
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
    */}
            </form>
        </div>
    )
}