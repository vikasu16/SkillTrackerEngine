import React from "react";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { AddSkill, UpdateSkillRemoved } from "./DashBoardService";

export default function SkillTracker(props) {
  const [skill, setskill] = React.useState({
    skillname: "",
  });
  const [updateSkill, setupdateSkill] = React.useState({
    skillid: "",
    status: false,
  });
  const [removeSkill, setremoveSkill] = React.useState({
    skillid: "",
    status: false,
  });

  const handleskillChange = (e) => {
    setskill({ ...skill, [e.target.name]: e.target.value });
  };

  const saveSkill = () => {
    if (skill.skillname.length > 2) {
      AddSkill(skill)
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
              alert("skill added successfully");
              setskill({ ...skill, ["skillname"]: "" });
              props.loadDetails();
            }
          }
        });
    } else {
      alert("skill name length should be greater than 2.");
    }
  };

  const handleReAddSkillChange = (e) => {
    setupdateSkill({ ...updateSkill, skillid: e.target.value, status: false });
  };

  const handleRemoveSkillChange = (e) => {
    setremoveSkill({ ...removeSkill, skillid: e.target.value, status: true });
  };

  const readd = () => {
    if (updateSkill.skillid !== "") {
      UpdateSkillRemoved(updateSkill)
        .then((response) => {
          if (response !== undefined) {
            if (response.ok) {
              return response.json();
            }
          } else {
            alert("Internal server error while updating skill.");
          }
        })
        .then((response) => {
          if (response) {
            if (response["is_success"]) {
              alert("skill readded successfully");
              setupdateSkill({ ...updateSkill, skillid: "", status: false });
              props.loadDetails();
            }
          }
        });
    } else {
      alert("select skill to readd.");
    }
  };

  const remove = () => {
    if (removeSkill.skillid !== "") {
      UpdateSkillRemoved(removeSkill)
        .then((response) => {
          if (response !== undefined) {
            if (response.ok) {
              return response.json();
            }
          } else {
            alert("Internal server error while updating skill.");
          }
        })
        .then((response) => {
          if (response) {
            if (response["is_success"]) {
              alert("skill removed successfully");
              setremoveSkill({ ...removeSkill, skillid: "", status: true });
              props.loadDetails();
            }
          }
        });
    } else {
      alert("select skill to remove.");
    }
  };

  return (
    <div className="card-document-container">
      <div className="card">
        <h5 className="card-header header-format">Manage Skills</h5>
        <div className="card-body">
          <fieldset className="fieldset-format">
            <div className="form-input">
              <span className="form-label">Add Skill:</span>
              <input
                type="text"
                id="skillname"
                name="skillname"
                required
                value={skill.skillname}
                onChange={handleskillChange}
              />
            </div>
            <div className="modal-close-button">
              <button className="material-ui-button-format" onClick={saveSkill}>
                <Tooltip title="Add">
                  <SaveIcon fontSize="small" />
                </Tooltip>
              </button>
            </div>
          </fieldset>
          <fieldset className="fieldset-format">
            <div className="form-input">
              <span className="form-label">Remove Skill:</span>
              <select
                className="form-select"
                style={{ border: "1px solid" }}
                value={removeSkill.skillid}
                onChange={handleRemoveSkillChange}
              >
                <option value="">--Select Skill--</option>
                {props.details.current_skills.length > 0
                  ? props.details.current_skills.map((cskill) => (
                      <option key={cskill.skill_id} value={cskill.skill_id}>
                        {cskill.skill_name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="modal-close-button">
              <button className="material-ui-button-format" onClick={remove}>
                <Tooltip title="Remove">
                  <RemoveCircleIcon fontSize="small" />
                </Tooltip>
              </button>
            </div>
          </fieldset>
          <fieldset className="fieldset-format">
            <div className="form-input">
              <span className="form-label">Readd Skill:</span>
              <select
                className="form-select"
                style={{ border: "1px solid" }}
                value={updateSkill.skillid}
                onChange={handleReAddSkillChange}
              >
                <option value="">--Select Skill--</option>
                {props.details.removed_skills.length > 0
                  ? props.details.removed_skills.map((cskill) => (
                      <option key={cskill.skill_id} value={cskill.skill_id}>
                        {cskill.skill_name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="modal-close-button">
              <button className="material-ui-button-format" onClick={readd}>
                <Tooltip title="Readd">
                  <RecyclingIcon fontSize="small" />
                </Tooltip>
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
