import React from "react";
import "./DashBoard.css";
import DailyTracker from "./DashBoard/DailyTracker";
import QuestionsTracker from "./DashBoard/QuestionsTracker";
import UserDetails from "./DashBoard/UserDetails";
import BarReport from "./DashBoard/BarReport";
import Header from "./Header";
import SkillTracker from "./DashBoard/SkillTracker";
import { useNavigate } from "react-router-dom";
import {
  GetUserDetails,
  GetSkills,
  GetTasksData,
} from "./DashBoard/DashBoardService";

export default function DashBoard() {
  const [userData, setUserData] = React.useState({
    user_name: "",
    user_bio: "",
    user_fullname: "",
    user_firstinital: "",
  });

  const [skiilsData, setskiilsData] = React.useState({
    current_skills: [],
    removed_skills: [],
  });

  const [taskDetails, settaskDetails] = React.useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [],
  });

  const [totaltimeusedtoday, settotaltimeusedtoday] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    loadUserInformation();
    loadSkillDetails();
    loadCurrentDailyTaskDetails();
    loadPreviousDailyTaskDetails();
  }, []);

  function loadUserInformation() {
    GetUserDetails()
      .then((response) => {
        if (response !== undefined) {
          if (response.ok) {
            return response.json();
          }
        } else {
          navigate("/");
        }
      })
      .then((values) => {
        if (values) {
          setUserData(values);
        }
      });
  }

  function loadSkillDetails() {
    GetSkills()
      .then((response) => {
        if (response !== undefined) {
          if (response.ok) {
            return response.json();
          }
        } else {
        }
      })
      .then((values) => {
        if (values) {
          setskiilsData(values);
        }
      });
  }

  function loadCurrentDailyTaskDetails() {
    var currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day;
    var startdate = new Date(currentDate.setDate(diff));
    var enddate = new Date(currentDate.setDate(startdate.getDate() + 6));

    var currendWeekData = {
      startdate: formatDateToYYYYMMDD(startdate),
      enddate: formatDateToYYYYMMDD(enddate),
    };

    GetTasksData(currendWeekData)
      .then((response) => {
        if (response !== undefined) {
          if (response.ok) {
            return response.json();
          }
        } else {
        }
      })
      .then((values) => {
        if (values) {
          const daysArray = values.map(({ day }) => day);
          const percentagesArray = values.map(
            ({ percentageoftimeused }) => percentageoftimeused
          );
          var datasetForCurrentWeek = {
            label: "Current Week Data",
            data: percentagesArray,
            backgroundColor: "green",
          };

          const currentDatevalue = new Date().toISOString().split("T")[0];

          // Find the entry where the date is equal to the current date
          const foundEntry = values.find(
            (entry) => entry.date === currentDatevalue
          );
          settotaltimeusedtoday(foundEntry.usedtime);

          settaskDetails((prevTaskDetails) => ({
            ...prevTaskDetails,
            datasets: prevTaskDetails.datasets.filter(
              (dataset) => dataset.label !== "Current Week Data"
            ),
          }));
          settaskDetails((prevTaskDetails) => ({
            ...prevTaskDetails,
            datasets: [...prevTaskDetails.datasets, datasetForCurrentWeek],
          }));
        }
      });
  }

  function loadPreviousDailyTaskDetails() {
    var currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day - 7;
    var startdate = new Date(currentDate.setDate(diff));
    var enddate = new Date(currentDate.setDate(startdate.getDate() + 6));

    var currendWeekData = {
      startdate: formatDateToYYYYMMDD(startdate),
      enddate: formatDateToYYYYMMDD(enddate),
    };

    GetTasksData(currendWeekData)
      .then((response) => {
        if (response !== undefined) {
          if (response.ok) {
            return response.json();
          }
        } else {
        }
      })
      .then((values) => {
        if (values) {
          const percentagesArray = values.map(
            ({ percentageoftimeused }) => percentageoftimeused
          );
          var datasetForPreviousWeek = {
            label: "Previous Week Data",
            data: percentagesArray,
            backgroundColor: "blue",
          };
          settaskDetails((prevTaskDetails) => ({
            ...prevTaskDetails,
            datasets: [...prevTaskDetails.datasets, datasetForPreviousWeek],
          }));
        }
      });
  }

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <DailyTracker
          details={totaltimeusedtoday}
          loadDetails={loadCurrentDailyTaskDetails}
          HeaderValue="Daily Task Tracker"
        />
        <QuestionsTracker
          HeaderValue="Questions"
          details={skiilsData.current_skills}
        />
        <UserDetails details={userData} loadDetails={loadUserInformation} />
      </div>
      <div className="dashboard-container">
        <BarReport
          details={taskDetails}
          loadDetails={loadCurrentDailyTaskDetails}
        />
        <SkillTracker details={skiilsData} loadDetails={loadSkillDetails} />
      </div>
    </div>
  );
}
