import * as React from "react"
import "./Welcome.css"
import { useState } from "react"
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

export default function Welcome(){
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignup, setToggleSignup] = useState(false);

    return(
        <div className="welcome-page">
            
            <div className="info">
                <h2>Welcome to Capstone!</h2>
                <p>Capstone is the best way to bring your classes, assignments and due dates together.</p>
            
                <div className="buttons">
                    <button className="signupBtn" onClick={() => setToggleSignup(true)}>
                        Sign up
                    </button>
                    {toggleSignup && <SignupForm />}

                    <button className="loginBtn" onClick={() => setToggleLogin(true)}>
                        Login
                    </button>
                    {toggleLogin && <LoginForm />}
                    
                </div>
                
            </div>
            <img src="https://assets-global.website-files.com/637f533d357967a5820f3f25/641b4a60692697b4e28910e8_deco_lines_home.svg" className="background-img"/>
        </div>
    )
}