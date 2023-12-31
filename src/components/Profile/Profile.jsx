import * as React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ isOpen }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.clear();
    navigate("/welcome");
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:8000/user/deleteAccount/${user.userId}`,
        { withCredentials: true }
      );
      if (result.data === "Deleted") {
        navigate("/welcome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch user information
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8000/getUser")
      .then((response) => {
        const { username, email } = response.data;
        //console.log(response.data);
        setUser(response.data);
        setUsername(username);
        setEmail(email);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile">
      <div className={`profile-content ${isOpen ? "sidebar-open" : ""}`}>
        <div className="profile-page">
          <div className="menu">
            <div className="options">
              <p>Profile </p>
              <button
                className="delete-account-button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-header">
              <h2>Welcome to your Profile Page!</h2>
            </div>

            <div className="user-information">
              <p>Username:</p>
              <form>
                <textarea
                  className="user-info-display"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p>Email:</p>
                <textarea
                  className="user-info-display"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </div>

            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
