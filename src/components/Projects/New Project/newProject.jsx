import { useState } from "react";
import "./newProject.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../Utils/utils";
import { selectAllUsers } from "../../Users/userSlice";
import { fetchProjects, addNewProject } from "../projectSlice";
import { fetchUsers } from "../../Users/userSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";

function NewProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const users = useSelector(selectAllUsers);

  const [inputValues, setInputValues] = useState({});
  const [requestStatus, setRequestStatus] = useState("idle")

  const currentDate = formatTimestamp(Date.now())

  const projectDetails = [
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

  const handleSaveNewProject = async (event) => {
    event.preventDefault();

    try {
      setRequestStatus('pending')
      const response = await dispatch(addNewProject(newProject));

      if (addNewProject.fulfilled.match(response)) {
        const {
          message,
          projectId,
        } = response.payload;

        await dispatch(fetchProjects());
        await dispatch(fetchUsers());

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
              {detail === "Manager" ? (
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
