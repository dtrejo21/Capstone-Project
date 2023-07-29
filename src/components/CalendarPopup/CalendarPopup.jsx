import React, { useState, useEffect } from "react";
import "./CalendarPopup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

//reusable calendar pop up component
export default function CalendarPopup({ handleClose, onSubmit, id }) {
  const [startDate, setStartDate] = useState(new Date());
  useState(new Date());

  const handleSubmit = (e, id) => {
    e.preventDefault();
    onSubmit(startDate, id);
  }

  return (
    <div className="calendar-popup">
      <div className="calendar-popup-container">
        <div className="calendar-header">
          <h3>Date</h3>
          <button className="calendar-close" onClick={handleClose}>
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="calendar-content">
          <DatePicker
            selected={startDate}
            minDate={new Date()}
            onChange={(date) => setStartDate(date)}
            inline
            showDisabledMonthNavigation
          />
          <div className="calendar-input">
            <input
              type="text"
              value={startDate.toLocaleDateString()}
              onChange={() => {}}
              className="calendar-box"
            />

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>

          <div className="calendar-buttons">
            <button className="calendar-submit" onClick={(e) => handleSubmit(e, id)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
