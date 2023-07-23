import React from "react";
import { AddQuestion } from "./DashBoardService";

export default function QuestionsTracker(props) {
  const formData = {
    skillid: "",
    level: "",
    link: "",
    isimportant: false,
    issolved: false,
  };
  const [formDataInput, setFormDataInput] = React.useState(formData);
  const [errorStatus, setErrorStatus] = React.useState(false);

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleChange = (e) => {
    if (e.target.name === "link") {
      if (isValidUrl(e.target.value)) {
        setErrorStatus(false);
      } else {
        setErrorStatus(true);
      }
    }
    setFormDataInput({ ...formDataInput, [e.target.name]: e.target.value });
  };

  const addQuestion = (e) => {
    e.preventDefault();
    if (!errorStatus) {
      AddQuestion(formDataInput)
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
              alert("question saved successfully");
              setFormDataInput({
                ...formDataInput,
                skillid: "",
                level: "",
                link: "",
                isimportant: false,
                issolved: false,
              });
            }
          }
        });
    } else {
      alert("link is not valid!");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h5 className="card-header header-format">{props.HeaderValue}</h5>
        <div className="card-body">
          <form onSubmit={addQuestion}>
            <div className="form-input">
              <span className="form-label">Skill:</span>
              <select
                name="skillid"
                className="form-select"
                value={formDataInput.skillid}
                onChange={handleChange}
                style={{ border: "1px solid" }}
                required
              >
                <option value="">--Select skill--</option>
                {props.details.length > 0
                  ? props.details.map((cskill) => (
                      <option key={cskill.skill_id} value={cskill.skill_id}>
                        {cskill.skill_name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="form-input">
              <span className="form-label">Level:</span>
              <select
                name="level"
                className="form-select"
                style={{ border: "1px solid" }}
                value={formDataInput.level}
                onChange={handleChange}
                required
              >
                <option value="">--Select level--</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-input">
              <span className="form-label">Link:</span>
              <input
                type="text"
                name="link"
                id="link"
                value={formDataInput.link}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="isimportant"
                id="isimportant"
                value={formDataInput.isimportant}
                onChange={handleChange}
              ></input>
              <span className="form-label format-checkbox-label">
                Important
              </span>
            </div>
            <div>
              <input
                type="checkbox"
                name="issolved"
                id="issolved"
                value={formDataInput.issolved}
                onChange={handleChange}
              ></input>
              <span className="form-label format-checkbox-label">Solved</span>
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
