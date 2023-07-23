import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { SaveBioInformation } from "./DashBoardService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UserDetails(props) {
  const [open, setOpen] = React.useState(false);
  var bio_value = props.details.user_bio === null ? "" : props.details.user_bio;
  const [bioInfo, setbioInfo] = React.useState({ bio: "" });

  const handleOpen = () => {
    setbioInfo({ ...bioInfo, bio: bio_value });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setbioInfo({ ...bioInfo, bio: bio_value });
  };
  const handleBioChange = (e) => {
    var length = e.target.value.length;
    if (length < 120) {
      setbioInfo({ ...bioInfo, bio: e.target.value });
    }
  };

  const savebio = () => {
    SaveBioInformation(bioInfo)
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
            alert("bio updated successfully");
            setOpen(false);
            props.loadDetails();
          }
        }
      });
  };

  return (
    <>
      <div className="card-container">
        <div className="card">
          <h5 className="card-header header-format">
            @{props.details.user_name}
          </h5>
          <div className="card-body">
            <div className="user-info">
              <div className="user-initial">
                <label className="format-user-inital">
                  {props.details.user_firstinital}
                </label>
              </div>
              <div className="user-title-name">
                {props.details.user_fullname}
              </div>
            </div>
            <div className="user-bio-details">
              <span className="form-label">Bio:</span>
              <button
                className="material-ui-button-format"
                onClick={handleOpen}
              >
                <Tooltip title="Edit bio">
                  <EditIcon fontSize="small" />
                </Tooltip>
              </button>
            </div>
            <div className="user-title-bio">
              {props.details.user_bio === null ? "" : props.details.user_bio}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <div className="card">
            <h5 className="card-header header-format">
              Edit Bio (max length 120)
            </h5>
            <div className="card-body modal-edit-bio">
              <textarea
                className="modal-textarea"
                value={bioInfo.bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-close-button">
            <button className="material-ui-button-format" onClick={savebio}>
              <Tooltip title="Save bio">
                <SaveIcon fontSize="small" />
              </Tooltip>
            </button>
            <button className="material-ui-button-format" onClick={handleClose}>
              <Tooltip title="close">
                <CloseIcon fontSize="small" />
              </Tooltip>
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
