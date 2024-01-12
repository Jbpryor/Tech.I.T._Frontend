import React, { useEffect, useState } from "react";
import "./newProject.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addProject } from "../projectSlice";
import { addNotification } from "../../Notifications/notificationsSlice";
import { formatTimestamp } from "../../../utils";
import { selectAllUsers } from "../../Users/userSlice";
import { selectAllProjects, fetchProjects, addNewProject } from "../projectSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";

function NewProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);


  const [newId, setNewId] = useState(0);
  const users = useSelector(selectAllUsers);
  const [inputValues, setInputValues] = useState({});
  const projects = useSelector(selectAllProjects);
  const [requestStatus, setRequestStatus] = useState("idle")

  const currentDate = formatTimestamp(Date.now())

  const date = new Date().toISOString();

  const location = useLocation();

  const projectDetails = [
    "Id",
    "Title",
    "Type",
    "Manager",
    "Frontend",
    "Backend",
    "Client Name",
    "Created",
    "Description",
  ];

  const newProject = {
    id: newId,
    title: inputValues["Title"] || "",
    type: inputValues["Type"] || "",
    manager: inputValues["Manager"] || "",
    frontend: inputValues["Frontend"] || "",
    backend: inputValues["Backend"] || "",
    clientName: inputValues["Client Name"] || "",
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

  // const handleSaveNewProject = (event) => {
  //   event.preventDefault();

  //   dispatch(addProject(newProject));
  //   dispatch(
  //     addNotification({
  //       message: "New project added",
  //       title: newProject.title,
  //       notificationLink: `/projects/${newProject.id}`,
  //       date: date,
  //     })
  //   );

  //   alert("New project was created!");

  //   setInputValues({});
  //   navigate(`/projects/${newProject.id}`);
  // };

  const handleSaveNewProject = async (event) => {
    event.preventDefault();

    try {
      setRequestStatus('pending')
      const response = await dispatch(addNewProject(newProject));

      if (addNewProject.fulfilled.match(response)) {
        const {
          title,
          message,
          projectId,
        } = response.payload;

        await dispatch(fetchProjects());

        dispatch(
          addNotification({
            message: message,
            title: title,
            notificationLink: `/projects/${projectId}`,
            date: date,
          })
        );

        alert(message);

        setInputValues({});

        navigate(`/projects/${projectId}`);
      } else {
        alert("Project creation failed: " + response.error.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred: " + error.message);
    } finally {
      setRequestStatus('idle')
    }
  };

  useEffect(() => {
    currentDate;
    if (projects && projects.length > 0) {
      const highestId = Math.max(...projects.map((project) => project.id), 0);
      setNewId(highestId + 1);
    } else {
      setNewId(1);
    }
  }, []);

  return (
    <section className="new-project" style={{ color: theme.font_color }}>
      <div
        className="new-project-container"
        style={{
          border: `2px solid ${theme.border}`,
          background: theme.primary_color,
          color: theme.font_color,
        }}
      >
        <div className="new-project-title">New Project</div>
        <form className="new-project-form">
          {projectDetails.map((detail) => (
            <div
              key={detail}
              className="new-project-details"
              style={{ borderBottom: `1px solid ${theme.border}` }}
            >
              <div className="new-project-detail">{detail}:</div>
              {detail === "Id" ? (
                <div className="new-project-input id">Project-{newId}</div>
              ) : detail === "Manager" ? (
                <select
                  className="new-project-input"
                  value={projectDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option
                    value=""
                    style={{
                      background: theme.background_color,
                      border: `0.5px solid ${theme.border}`,
                      color: theme.font_color,
                    }}
                  >
                    Select a Manager...
                  </option>
                  {users.map(
                    (user, index) =>
                      user.role === "Project Manager" && (
                        <option
                          key={index}
                          value={`${user.name.first} ${user.name.last}`}
                          style={{
                            background: theme.background_color,
                            border: `0.5px solid ${theme.border}`,
                            color: theme.font_color,
                          }}
                        >
                          {user.name.first} {user.name.last}
                        </option>
                      )
                  )}
                </select>
              ) : detail === "Created" ? (
                <div className="new-project-input date">{currentDate}</div>
              ) : detail === "Description" ? (
                <textarea
                  type="text"
                  className="new-project-input description"
                  placeholder={` Enter ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                />
              ) : (
                <input
                  type="text"
                  className="new-project-input text"
                  placeholder={` Enter ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                />
              )}
            </div>
          ))}
        </form>
        <div className="new-project-button-container">
          <button
            className="new-project-button"
            onClick={handleSaveNewProject}
            style={{
              border: `2px solid ${theme.border}`,
              background: theme.background_color,
              color: theme.font_color,
            }}
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewProject;
