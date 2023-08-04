import * as React from "react";
import "./StudySpace.css";
import { useEffect, useState } from "react";

export default function StudySpace() {
  const [quote, setQuote] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //fetch user api
  useEffect(() => {
    fetch("https://api.quotable.io/random?=inspirational")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        //console.log(data);
        setQuote(data.content);
      })
      .catch((err) => console.log(error));
  }, []);
/*
  const studyTimer = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return interval;
  }

  const stopWatch = interval => {
    clearInterval(interval)
    setIsRunning(false);
  }

  const resetStopwatch = () => {
    setTime(0)
  }

  const toggleStopwatch = () => {
    if (isRunning) {
      const intervalId = startStopwatch();
      stopStopwatch(intervalId);
    } else {
      startStopwatch();
    }
  };*/

  return (
    <div className="study-space">
      <div className="study-space-content">
        <h2>Hi, Welcome to your Study space!</h2>

        <div className="timer">

        </div>

        <div className="quote-content">
          <div className="quote-wrapper">
            <p>Would you like a quote?</p>

            <div className="quote-buttons">
              <button className="quote-btn" onClick={() => setShowQuote(true)}>
                Yes
              </button>
              <button className="quote-btn" onClick={() => setShowQuote(false)}>
                No
              </button>
            </div>
          </div>

          {showQuote && <div className="quote-text">{quote}</div>}
        </div>
      </div>
    </div>
  );
}
