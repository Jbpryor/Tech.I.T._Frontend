import { useState } from "react";
import "./issue.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IssueModifications from "./Modificatons/issueModifications";
import Attachments from "./Attachments/attachments";
import Comments from "./Comments/comments";
import useWindowSize from "../../../Hooks/useWindowSize";
import { capitalizeFirstLetter, formatTimestamp } from "../../../../Utils/utils";
import {
  fetchIssues,
  updateIssue,
  deleteIssue,
  selectIssueById,
} from "../issueSlice";
import { selectAllProjects } from "../../Projects/projectSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import useAuth from "../../../Hooks/useAuth";
import { fetchUsers } from "../../Users/userSlice";
import { PulseLoader } from "react-spinners";

function Issue() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const theme = useSelector(selectTheme);

  const { role } = useAuth();

  const { issueId } = useParams();
  const [isEditMode, setEditMode] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [editedDetail, setEditedDetail] = useState({});
  const [, setShowUpdatedField] = useState(false);
  const [previousState, setPreviousState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingPage, setIsDraggingPage] = useState(false);
  const [isModificationsViewActive, setModificationsViewActive] = useState(
    false
  );
  // const error = useSelector(getIssuesError);

  const issue = useSelector((state) => selectIssueById(state, issueId));

  const issueOrder = ['title', 'created', 'project', 'status', 'priority', 'submitter', 'developer', '_id', 'description', 'modifications', 'comments', '__v', 'attachments' ];

  const { width } = useWindowSize();

  const smallerScreen = width < 500;
  const midSizeScreen = width < 1000;

  // const [created, setCreated] = useState(issue?.created)
  // const [description, setDescription] = useState(issue?.description)
  // const [developer, setDeveloper] = useState(issue?.developer)
  // const [priority, setPriority] = useState(issue?.priority)
  // const [project, setProject] = useState(issue?.project)
  // const [status, setStatus] = useState(issue?.status)
  // const [submitter, setSubmitter] = useState(issue?.submitter)
  // const [title, setTitle] = useState(issue?.title)
  // const [type, setType] = useState(issue?.type)
  // const [modified, setModified] = useState(issue?.modified)

  const timeStamp = new Date().toISOString();

  const handleEdit = (detail) => {
    setPreviousState((prev) => ({
      ...prev,
      [detail]: issue[detail],
    }));
    setEditMode({ ...isEditMode, [detail]: true });
    setShowSaveButton(true);
    setShowUpdatedField(true);
  };

  const handleDetailChange = (event, detail) => {
    const { value } = event.target;
    setEditedDetail((prevEditedDetail) => ({
      ...prevEditedDetail,
      [detail]: value,
    }));
  };

  const handleCancel = (detail) => {
    setEditMode({ ...isEditMode, [detail]: false });
    delete editedDetail[detail];
    setEditedDetail({ ...editedDetail });
  };

  const saveEditedIssue = async () => {
    let modifications = {};

    for (const [key, value] of Object.entries(editedDetail)) {
      modifications = {
        type: key,
        previousState: previousState[key],
        currentState: value,
        modified: timeStamp,
      };
    }

    const updatedIssue = {
      ...issue,
      ...editedDetail,
      modifications: modifications,
      modified: formatTimestamp(timeStamp),
    };

    try {
      setIsLoading(true);

      const response = await dispatch(updateIssue(updatedIssue));

      if (updateIssue.fulfilled.match(response)) {
        setIsLoading(false);
        const { message, title, updatedIssue } = response.payload;
        alert(message);

        await dispatch(fetchIssues());

        setEditedDetail({});
        setEditMode({});
        setShowSaveButton(false);
      } else {
        alert("Issue update failed: " + response.error.message);
      }
    } catch (error) {
      console.error("Failed to save the edited issue", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIssue = async () => {
    if (
      window.confirm(
        `\nAre you sure you want to delete\n\nIssue: ${issue.title}?`
      )
    ) {
      try {
        setIsLoading(true);

        const issueId = {
          _id: issue._id,
        };
        const response = await dispatch(deleteIssue(issueId));

        if (deleteIssue.fulfilled.match(response)) {
          setIsLoading(false);
          const { message } = response.payload;

          alert(message);

          dispatch(fetchIssues());
          await dispatch(fetchUsers());

          navigate(-1);
        } else {
          console.log("Error deleting issue:", response.payload);
        }
      } catch (error) {
        console.error("Failed to delete the issue", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePageDragOver = (event) => {
    event.preventDefault();
    setIsDraggingPage(true);
  };

  const handlePageDragLeave = () => {
    setIsDraggingPage(false);
  };

  const toggleModificationView = () => {
    setModificationsViewActive(!isModificationsViewActive);
  };

  if (!issue) {
    return (
      <section
        className="issue"
        style={{ color: theme.font_color, background: theme.background_color }}
      >
        <div className="issue-container">
          <div className="issue-null">Issue not found</div>
        </div>
      </section>
    );
  }

  if (isLoading)
  return (
    <section className="login-container">
      <div className="loading-content">
        <img src="/images/it.png" alt="Loading Icon" />
        {`...Loading (${countdown} seconds)`}
        <PulseLoader color={"#FFF"} />
      </div>
    </section>
  );

  if (issue) {
    return (
      <section
        className={`issue ${isDraggingPage ? "dragging" : ""}`}
        onDragOver={handlePageDragOver}
        onDragLeave={handlePageDragLeave}
      >
        {isModificationsViewActive ? (
          <div className="modifications-container">
            {midSizeScreen ? (
              <div
                className="modifications-return-title"
                style={{
                  color: theme.font_color,
                }}
              >
                <i
                  className="bx bx-left-arrow modifications-icon"
                  onClick={toggleModificationView}
                ></i>
                <div>Modifications</div>
              </div>
            ) : null}
            <IssueModifications
              issue={issue}
              theme={theme}
              smallerScreen={smallerScreen}
            />
            {!midSizeScreen ? (
              <div className="mod-button-container">
                <button
                  className="issues-view-button"
                  onClick={toggleModificationView}
                  style={{
                    background: theme.primary_color,
                    border: `2px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  Back to issue
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="issue-container">
            {smallerScreen ? (
              <div
                className="issue-return-title"
                style={{
                  color: theme.font_color,
                }}
              >
                <i
                  className="bx bx-left-arrow issue-icon"
                  onClick={() => navigate(-1)}
                ></i>
                <div>Issue</div>
              </div>
            ) : null}
            <div
              className="issue-content"
              style={{
                background: theme.primary_color,
                color: theme.font_color,
                border: `2px solid ${theme.border}`,
              }}
            >
              {issueOrder.map(
                (detail) =>
                  detail !== "modifications" &&
                  detail !== "comments" &&
                  detail !== "__v" &&
                  detail !== "attachments" && (
                    <div
                      className="issue-details"
                      key={detail}
                      style={{ borderBottom: `1px solid ${theme.border}` }}
                      onClick={
                        !isEditMode[detail] &&
                        detail !== "modified" &&
                        smallerScreen
                          ? () => handleEdit(detail)
                          : detail === "modified"
                          ? toggleModificationView
                          : undefined
                      }
                    >
                      <div className="issue-title">
                        {detail === "_id"
                          ? "Id"
                          : capitalizeFirstLetter(detail)}
                        :
                      </div>
                      {isEditMode[detail] && detail === "type" ? (
                        <select
                          className="issue-detail"
                          value={editedDetail[detail] || issue[detail]}
                          onChange={(event) =>
                            handleDetailChange(event, detail)
                          }
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                          }}
                        >
                          <option value="">Select a type...</option>
                          <option value="Bug">Bug</option>
                          <option value="Feature">Feature</option>
                          <option value="Documentation">Documentation</option>
                          <option value="Crash">Crash</option>
                          <option value="Task">Task</option>
                        </select>
                      ) : isEditMode[detail] && detail === "status" ? (
                        <select
                          className="issue-detail"
                          value={editedDetail[detail] || issue[detail]}
                          onChange={(event) =>
                            handleDetailChange(event, detail)
                          }
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                          }}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Postponed">Postponed</option>
                          <option value="Closed">Closed</option>
                        </select>
                      ) : isEditMode[detail] && detail === "project" ? (
                        <select
                          className="issue-detail"
                          value={editedDetail[detail] || issue[detail]}
                          onChange={(event) =>
                            handleDetailChange(event, detail)
                          }
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                          }}
                        >
                          {projects.map((project) => (
                            <option value={project.title}>
                              {project.title}
                            </option>
                          ))}
                        </select>
                      ) : isEditMode[detail] && detail === "priority" ? (
                        <select
                          className="issue-detail"
                          value={editedDetail[detail] || issue[detail]}
                          onChange={(event) =>
                            handleDetailChange(event, detail)
                          }
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                          }}
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      ) : isEditMode[detail] ? (
                        <input
                          className="issue-detail"
                          type="text"
                          value={editedDetail[detail] || issue[detail]}
                          onChange={(event) =>
                            handleDetailChange(event, detail)
                          }
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                            border: "none",
                          }}
                        />
                      ) : (
                        <div className="issue-detail">
                          {editedDetail[detail] || issue[detail]}
                        </div>
                      )}
                      {smallerScreen ? (
                        detail === "modified" ? (
                          <button
                            className="modifications-modified-button"
                            onClick={toggleModificationView}
                            style={{
                              color: theme.font_color,
                            }}
                          >
                            <i className="bx bx-right-arrow"></i>
                          </button>
                        ) : isEditMode[detail] ? (
                          <button
                            className="modifications-cancel-button"
                            onClick={() => handleCancel(detail)}
                            style={{
                              color: theme.font_color,
                            }}
                          >
                            X
                          </button>
                        ) : (
                          <button
                            className="modifications-modify-button"
                            onClick={() => handleEdit(detail)}
                            style={{
                              color: theme.font_color,
                            }}
                          >
                            <i className="bx bx-right-arrow"></i>
                          </button>
                        )
                      ) : detail === "modified" ? (
                        <button
                          className="modifications-view-button"
                          onClick={toggleModificationView}
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          View
                        </button>
                      ) : detail === "_id" || detail === "created" ? (
                        <div></div>
                      ) : isEditMode[detail] ? (
                        <button
                          className="modifications-cancel-button"
                          onClick={() => handleCancel(detail)}
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="modificatins-modify-button"
                          onClick={() => handleEdit(detail)}
                          style={{
                            background: theme.background_color,
                            color: theme.font_color,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          Modify
                        </button>
                      )}
                    </div>
                  )
              )}
              {role !== "Submitter" && (
                <div className="issue-buttons-container">
                  {!showSaveButton && (
                    <button
                      className="issue-delete-button"
                      onClick={handleDeleteIssue}
                      style={{
                        background: theme.background_color,
                        color: theme.font_color,
                        border: smallerScreen
                          ? "none"
                          : `2px solid ${theme.border}`,
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {showSaveButton && (
                    <button
                      className="issue-save-button"
                      onClick={saveEditedIssue}
                      style={{
                        background: theme.background_color,
                        color: theme.font_color,
                        border: smallerScreen
                          ? "none"
                          : `2px solid ${theme.border}`,
                      }}
                    >
                      Save
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <Comments
          issue={issue}
          timeStamp={timeStamp}
          theme={theme}
          smallerScreen={smallerScreen}
          requestStatus={requestStatus}
          setIsLoading={setIsLoading}
        />

        <Attachments
          issue={issue}
          theme={theme}
          smallerScreen={smallerScreen}
          isDraggingPage={isDraggingPage}
          setIsDraggingPage={setIsDraggingPage}
          requestStatus={requestStatus}
          setIsLoading={setIsLoading}
        />
      </section>
    );
  }
}

export default Issue;
