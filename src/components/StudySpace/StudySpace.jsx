import * as React from "react";
import "./StudySpace.css";
import { useEffect, useState } from "react";

export default function StudySpace({ isOpen }) {
  const [quote, setQuote] = useState(null);
  const [quoteAuthor, setQuoteAuthor] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showQuoteDisplay, setShowQuoteDisplay] = useState(false);
  const [intervalid, setIntervalId] = useState(null);
  //fetch user api
  useEffect(() => {
    fetchQuote();
  }, []);

  //get a quote
  const fetchQuote = () => {
    fetch("https://api.quotable.io/quotes/random?tags=Inspirational&maxLength=100")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        //console.log(data[0]);
        setQuote(data[0].content);
        setQuoteAuthor(data[0].author);
      })
      .catch((err) => console.log(err));
  };

  const studyTimer = () => {
    setIsRunning(true);
    const intervalid = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return intervalid;
  };

  const stopWatch = (intervalid) => {
    clearInterval(intervalid);
    setIsRunning(false);
  };
  //reset interval
  const resetStudyTimer = () => {
    stopWatch(intervalid);
    setTime(0);
    setIsRunning(false);
  };

  const toggleStopwatch = () => {
    if (isRunning) {
      stopWatch(intervalid);
    } else {
      const newIntervalid = studyTimer(); // Start the timer
      setIntervalId(newIntervalid);
    }

    setIsRunning(!isRunning);
  };

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const displayTimer = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="study-space">
      <div className={`study-space-page-content ${isOpen ? "sidebar-open" : ""}`}>
        <div className="study-space-content">
          <h2>Welcome to your Study space!</h2>

          <div className="timer">
            <div className="timer-header">
              <p>Personal Timer</p>
            </div>
            <div className="timer-content">
              <div className="timer-stopwatch">
                <p>{displayTimer}</p>
              </div>

              <div className="timer-buttons">
                <button onClick={toggleStopwatch}>
                  {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={resetStudyTimer}>Reset</button>
              </div>
            </div>
          </div>

          <div className="study-menu">
            <button
              className="study-menu-options menu-transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="material-icons">more_vert</i>
            </button>
            {showMenu && (
              <div className="quote-options">
                <button
                  className="quote-button"
                  onClick={() => setShowQuoteDisplay(!showQuoteDisplay)}
                >
                  <i className="material-icons">format_quote</i>
                </button>

                {showQuoteDisplay && (
                  <div className="quote-options">
                    <div className="quote-menu">
                      <h5>Motivational Quote</h5>
                      <button className="quote-shuffle" onClick={fetchQuote}>
                        Shuffle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="quote-wrapper">
            <div className="quote-content">
              <div className="quote-text">
                <h3>"{quote}"</h3>
                <p>{quoteAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
