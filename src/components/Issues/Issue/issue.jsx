import React, { useState, useEffect } from "react";
import "./issue.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteIssue,
  modifyIssue,
  addModifications,
} from "../../../Store/Slices/issueSlice";
import IssueModifications from "./Modificatons/issueModifications";
import Comments from "./Comments/comments";
import useWindowSize from "../../../Hooks/useWindowSize";
import { capitalizeFirstLetter } from "../../../utils";

function Issue() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const issues = useSelector((state) => state.issues);
  const projects = useSelector((state) => state.projects);
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

  const { issueId } = useParams();
  const [isEditMode, setEditMode] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [editedDetail, setEditedDetail] = useState({});
  const [, setShowUpdatedField] = useState(false);
  const [previousState, setPreviousState] = useState({});

  const issue = issues.find((issue) => issue.id.toString() === issueId);

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

  const saveEditedIssue = () => {
    const pairedStates = {};

    for (const [key, value] of Object.entries(editedDetail)) {
      if (previousState.hasOwnProperty(key)) {
        pairedStates[key] = {
          previousState: previousState[key],
          currentState: value,
          modified: timeStamp,
        };
      }
    }

    const updatedIssue = {
      ...issue,
      ...editedDetail,
    };

    dispatch(modifyIssue(updatedIssue));
    dispatch(
      addModifications({ issueId: issue.id, modifications: pairedStates })
    );

    setEditedDetail({});
    setEditMode({});
    setShowSaveButton(false);
  };

  const handleDeleteIssue = () => {
    dispatch(deleteIssue(issue.id));
    navigate("/issues");
  };

  const [droppedFiles, setDroppedFiles] = useState([]);
  const [droppedFile, setDroppedFile] = useState(false);
  const [isDraggingPage, setIsDraggingPage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [savedFiles, setSavedFiles] = useState([]);
  const [isModificationsViewActive, setModificationsViewActive] = useState(
    false
  );

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handlePageDragOver = (event) => {
    event.preventDefault();
    setIsDraggingPage(true);
  };

  const handlePageDragLeave = () => {
    setIsDraggingPage(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setIsDraggingPage(false);
    const files = Array.from(event.dataTransfer.files);
    setDroppedFiles(files);
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setDroppedFiles(files);
    setDroppedFile(true);
  };

  const handleSaveUpload = () => {
    if (droppedFiles.length > 0) {
      setSavedFiles([...savedFiles, ...droppedFiles]);
      setDroppedFiles([]);
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...savedFiles];
    updatedFiles.splice(index, 1);
    setSavedFiles(updatedFiles);
  };

  const toggleModificationView = () => {
    setModificationsViewActive(!isModificationsViewActive);
  };

  const { width } = useWindowSize();

  const smallerScreen = width < 500;
  const midSizeScreen = width < 1000;

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
            {Object.keys(issue).map(
              (detail) =>
                detail !== "id" &&
                detail !== "modifications" &&
                detail !== "comments" && (
                  <div
                    className="issue-details"
                    key={detail}
                    style={{ borderBottom: `1px solid ${theme.border}` }}
                    onClick={!isEditMode[detail] && detail !== "modified" && smallerScreen ? () => handleEdit(detail) : detail === "modified" ? toggleModificationView : undefined}
                  >
                    <div className="issue-title">
                      {capitalizeFirstLetter(detail)}:
                    </div>
                    {isEditMode[detail] && detail === "type" ? (
                      <select
                        className="issue-detail"
                        value={editedDetail[detail] || issue[detail]}
                        onChange={(event) => handleDetailChange(event, detail)}
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
                        onChange={(event) => handleDetailChange(event, detail)}
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
                        onChange={(event) => handleDetailChange(event, detail)}
                        style={{
                          background: theme.background_color,
                          color: theme.font_color,
                        }}
                      >
                        {projects.map((project) => (
                          <option value={project.title}>{project.title}</option>
                        ))}
                      </select>
                    ) : isEditMode[detail] && detail === "priority" ? (
                      <select
                        className="issue-detail"
                        value={editedDetail[detail] || issue[detail]}
                        onChange={(event) => handleDetailChange(event, detail)}
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
                        onChange={(event) => handleDetailChange(event, detail)}
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
                            color: theme.font_color
                          }}
                        >
                          <i className="bx bx-right-arrow"></i>
                        </button>
                      ) : isEditMode[detail] ? (
                        <button
                          className="modifications-cancel-button"
                          onClick={() => handleCancel(detail)}
                          style={{
                            color: theme.font_color
                          }}
                        >
                          X
                        </button>
                      ) : (
                        <button
                          className="modifications-modify-button"
                          onClick={() => handleEdit(detail)}
                          style={{
                            color: theme.font_color
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
            <div className="issue-buttons-container">
              {!showSaveButton && (
                <button
                  className="issue-delete-button"
                  onClick={handleDeleteIssue}
                  style={{
                    background: theme.background_color,
                    color: theme.font_color,
                    border: smallerScreen ? 'none' : (`2px solid ${theme.border}`),
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
                    border: smallerScreen ? 'none' : (`2px solid ${theme.border}`),
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Comments
        issue={issue}
        timeStamp={timeStamp}
        theme={theme}
        smallerScreen={smallerScreen}
      />

      <div
        className="issue-attachments-container"
        style={{
          background: theme.primary_color,
          border: `2px solid ${theme.border}`,
          color: theme.font_color,
        }}
      >
        <div
          className="issue-attachments-title"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          Attachments
        </div>
        <div className="issue-attachments-content">
          <div className="issue-attachments-saved">
            {savedFiles.map((file, index) => (
              <>
                <Link
                  className="issue-attachments-saved-files"
                  key={index}
                  href={file.url}
                  target="_blank"
                >
                  {file.name}
                </Link>
                <div className="issue-attachments-button-container">
                  {smallerScreen ? (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteFile(index)}
                      style={{
                        border: `1px solid ${theme.border}`,
                        background: theme.background_color,
                        color: theme.font_color,
                      }}
                    >
                      X
                    </button>
                  ) : (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteFile(index)}
                      style={{
                        border: `1px solid ${theme.border}`,
                        background: theme.background_color,
                        color: theme.font_color,
                      }}
                    >
                      delete
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
        <div
          className="issue-attachments-box"
          style={{ border: `2px solid ${theme.border}` }}
        >
          <button
            className="issue-attachments-button"
            onClick={handleSaveUpload}
            style={{
              border: `2px solid ${theme.border}`,
              color: theme.font_color,
              background: theme.primary_color,
            }}
          >
            +
          </button>
          <div
            className={`issue-attachments-drop ${
              isDragging ? "drag-over" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `5px dotted ${theme.border}`,
              background: theme.background_color,
            }}
          >
            {droppedFiles.length > 0 &&
            droppedFiles[droppedFiles.length - 1] ? (
              <div className="issue-attachments-file">
                {droppedFiles[droppedFiles.length - 1].name}
              </div>
            ) : (
              <>
                {smallerScreen ? (
                  <div className="issue-attachments-link">
                    <label htmlFor="file-input">Add a file</label>
                  </div>
                ) : (
                  <div className="issue-attachments-link">
                    {isDraggingPage
                      ? "Drop files here or "
                      : "Drag files here or "}{" "}
                    <label htmlFor="file-input">browse</label>
                  </div>
                )}
                <input
                  className="issue-attachment-file-input"
                  type="file"
                  id="file-input"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileInputChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Issue;
