import React from "react";
import { AddTask } from "./DashBoardService";

export default function DailyTracker(props) {
  const formData = { topic: "", timespend: "", description: "" };
  const [formDataInput, setFormDataInput] = React.useState(formData);
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [errorStatusForTime, setErrorStatusForTime] = React.useState(false);

  function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  }

  function addTimes(time1, time2) {
    const totalMinutes = timeToMinutes(time1) + timeToMinutes(time2);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  function isTimeGreaterThan(time1, time2) {
    return timeToMinutes(time1) > timeToMinutes(time2);
  }

  const handleChange = (e) => {
    if (e.target.name === "description") {
      var length = e.target.value.length;
      if (length > 120 || length < 15) {
        setErrorStatus(true);
      } else {
        setErrorStatus(false);
      }
    }
    if (e.target.name === "timespend") {
      var inputvalue = e.target.value;
      if (inputvalue.includes(":")) {
        var totalvalue = addTimes(inputvalue, props.details);
        if (isTimeGreaterThan(totalvalue, "17:00")) {
          setErrorStatusForTime(true);
        } else {
          setErrorStatusForTime(false);
        }
      }
    }
    setFormDataInput({ ...formDataInput, [e.target.name]: e.target.value });
  };

  const addDailyTask = (e) => {
    e.preventDefault();
    if (!errorStatus) {
      if (!errorStatusForTime) {
        AddTask(formDataInput)
          .then((response) => {
            if (response !== undefined) {
              if (response.ok) {
                return response.json();
              }
            } else {
              alert("Internal server error while saving skill.");
            }
          })
          .then((response) => {
            if (response) {
              if (response["is_success"]) {
                alert("task added successfully");
                setFormDataInput({
                  ...formDataInput,
                  topic: "",
                  timespend: "",
                  description: "",
                });
                props.loadDetails();
              }
            }
          });
      } else {
        alert("total hour spend per day can not exceed over 17 hours.");
      }
    } else {
      alert("description should be under 15 to 120 characters.");
    }
  };
  return (
    <div className="card-container">
      <div className="card">
        <h5 className="card-header header-format">{props.HeaderValue}</h5>
        <div className="card-body tracker-container-card">
          <form onSubmit={addDailyTask}>
            <div className="form-input">
              <span className="form-label">Topic:</span>
              <input
                type="text"
                name="topic"
                id="topic"
                placeholder=""
                value={formDataInput.topic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input">
              <span className="form-label">Time Spend:</span>
              <input
                type="time"
                name="timespend"
                id="timespend"
                placeholder=""
                value={formDataInput.timespend}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input">
              <span className="form-label">Comment:</span>
              <textarea
                name="description"
                id="description"
                value={formDataInput.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="modal-close-button">
              <button type="submit" className="submit-button btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
