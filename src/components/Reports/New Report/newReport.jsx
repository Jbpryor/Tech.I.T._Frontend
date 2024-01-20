import React, { useEffect, useState } from "react";
import "./newReport.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNewReport, fetchReports } from "../reportSlice";
import { addNotification } from "../../Notifications/notificationsSlice";
import { formatTimestamp } from "../../../utils";
import { selectAllUsers } from "../../Users/userSlice";
import { selectAllProjects } from "../../Projects/projectSlice";
import { selectAllReports } from "../reportSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";

function NewReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newId, setNewId] = useState(0);
  const users = useSelector(selectAllUsers);
  const [inputValues, setInputValues] = useState({});
  const reports = useSelector(selectAllReports);
  const projects = useSelector(selectAllProjects);
  const theme = useSelector(selectTheme);
  const [requestStatus, setRequestStatus] = useState('idle');

  const currentDate = formatTimestamp(Date.now())
  const date = new Date().toISOString();

  const reportDetails = [
    "Created",
    "Subject",
    "Type",
    "Submitter",
    "Project",
    "Description",
  ];

  const newReport = {
    id: newId,
    subject: inputValues["Subject"] || "",
    type: inputValues["Type"] || "",
    submitter:
      inputValues["Submitter"] ||
      "" /* this needs to be set to the logged in user */,
    project: inputValues["Project"] || "",
    created: currentDate,
    description: inputValues["Description"] || "",
  };

  const handleInputChange = (event, detail) => {
    const { value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [detail]: value,
    }));
  };

  const handleSaveNewReport = async (event) => {
    event.preventDefault();

    try {
      setRequestStatus('pending')
      const response = await dispatch(addNewReport(newReport));

      if (addNewReport.fulfilled.match(response)) {
        const {
          title,
          message,
          reportId,
        } = response.payload;

        await dispatch(fetchReports());

        dispatch(
          addNotification({
            message: message,
            title: title,
            notificationLink: `/reports/${reportId}`,
            date: date,
          })
        );

        alert(message);

        setInputValues({});

        navigate(`/reports/${reportId}`);
      } else {
        alert("Report creation failed: " + response.error.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred: " + error.message);
    } finally {
      setRequestStatus('idle')
    }
  };

  useEffect(() => {
    currentDate;
    if (reports && reports.length > 0) {
      const highestId = Math.max(...reports.map((report) => report.id), 0);
      setNewId(highestId + 1);
    } else {
      setNewId(1);
    }
  }, []);

  return (
    <section className="new-report">
      <div
        className="new-report-container"
        style={{
          border: `2px solid ${theme.border}`,
          color: theme.font_color,
          background: theme.primary_color,
        }}
      >
        <div className="new-report-title">New Report</div>
        <form className="new-report-form">
          {reportDetails.map((detail) => (
            <div
              key={detail}
              className="new-report-details"
              style={{ borderBottom: `1px solid ${theme.border}` }}
            >
              {detail === "Type" ? (
                <select
                  className="new-report-input"
                  value={reportDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    border: `0.5px solid ${theme.border}`,
                    background: theme.background_color,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Type...</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Crash">Crash</option>
                  <option value="Task">Task</option>
                </select>
              ) : detail === "Project" ? (
                <select
                  className="new-report-input"
                  value={reportDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    border: `0.5px solid ${theme.border}`,
                    background: theme.background_color,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Project...</option>
                  {projects.map((project, index) => (
                    <option key={index} value={`${project.title}`}>
                      {project.title}
                    </option>
                  ))}
                </select>
              ) : detail === "Submitter" ? (
                <select
                  className="new-report-input"
                  value={reportDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    border: `0.5px solid ${theme.border}`,
                    background: theme.background_color,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Submitter...</option>
                  {users.map((user, index) => (
                    <option
                      key={index}
                      value={`${user.name.first} ${user.name.last}`}
                    >
                      {user.name.first} {user.name.last}
                    </option>
                  ))}
                </select>
              ) : detail === "Created" ? (
                <div
                  className="new-report-input date"
                  style={{
                    background: theme.primary_color,
                    color: theme.font_color,
                  }}
                >
                  {currentDate}
                </div>
              ) : detail === "Description" ? (
                <textarea
                  type="text"
                  className="new-report-input description"
                  placeholder={` Enter a detailed ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    border: `0.5px solid ${theme.border}`,
                    background: theme.background_color,
                    color: theme.font_color,
                  }}
                />
              ) : (
                <input
                  type="text"
                  className="new-report-input text"
                  placeholder={` Enter ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    border: `0.5px solid ${theme.border}`,
                    background: theme.background_color,
                    color: theme.font_color,
                  }}
                />
              )}
            </div>
          ))}
        </form>
        <div className="new-report-button-container">
          <button
            className="new-report-button"
            onClick={handleSaveNewReport}
            style={{
              border: `2px solid ${theme.border}`,
              color: theme.font_color,
              background: theme.background_color,
            }}
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewReport;
