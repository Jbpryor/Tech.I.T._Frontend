import React, { useEffect, useState } from "react";
import "./newReport.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReport } from "../../../Store/Slices/reportSlice";
import { addNotification } from "../../../Store/Slices/notificationsSlice";
import { formatTimestamp } from "../../../utils";

function NewReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newId, setNewId] = useState(0);
  const users = useSelector((state) => state.users);
  const [inputValues, setInputValues] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const reports = useSelector((state) => state.reports);
  const projects = useSelector((state) => state.projects);
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

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

  const handleSaveNewReport = (event) => {
    event.preventDefault();

    dispatch(addReport(newReport));
    dispatch(
      addNotification({
        message: "New report added",
        title: newReport.subject,
        notificationLink: `/reports/${newReport.id}`,
        currentDate: formatTimestamp(Date.now()),
      })
    );

    alert("New report was created!");

    setInputValues({});
    navigate(`/reports/${newReport.id}`);
  };

  useEffect(() => {
    formatTimestamp(Date.now());
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
