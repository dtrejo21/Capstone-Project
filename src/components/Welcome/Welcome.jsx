import * as React from "react";
import "./Welcome.css";
import { useState, useEffect } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

export default function Welcome() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    if (signedUp) {
      setToggleSignup(false);
      setToggleLogin(true);
    }
  }, [signedUp]);

  return (
    <div className="welcome-page">
      <div className="info">
        <h2>Welcome to StudyFlow!</h2>
        <p>
        StudyFlow is your personalized study companion designed to 
        empower your learning journey.
        </p>

        <div className="buttons">
          <button className="signupBtn" onClick={() => setToggleSignup(true)}>
            Sign up
          </button>
          {toggleSignup && <SignupForm setSignedUp={setSignedUp} />}

          <button className="loginBtn" onClick={() => setToggleLogin(true)}>
            Login
          </button>
          {toggleLogin && <LoginForm />}
        </div>
      </div>
      <img
        src="https://assets-global.website-files.com/637f533d357967a5820f3f25/641b4a60692697b4e28910e8_deco_lines_home.svg"
        className="background-img"
      />
    </div>
  );
}
