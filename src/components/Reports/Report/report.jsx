import React, { useState, useEffect } from "react";
import "./report.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport } from "../../../Store/Slices/reportSlice";
import Comments from "./Comments/comments";
import useWindowSize from "../../../Hooks/useWindowSize";
import { capitalizeFirstLetter } from "../../../utils";

function Report() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const { reportId } = useParams();
  const report = reports.find((report) => report.id.toString() === reportId);
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

  const handleDeleteReport = () => {
    dispatch(deleteReport(report.id));
    navigate("/reports");
  };

  const timeStamp = new Date().toISOString();

  const [droppedFiles, setDroppedFiles] = useState([]);
  const [droppedFile, setDroppedFile] = useState(false);
  const [isDraggingPage, setIsDraggingPage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [savedFiles, setSavedFiles] = useState([]);

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

  const { width } = useWindowSize();
  const smallerScreen = width < 500;

  return (
    <section
      className={`report ${isDraggingPage ? "dragging" : ""}`}
      onDragOver={handlePageDragOver}
      onDragLeave={handlePageDragLeave}
    >
      <div className="report-container">
        {smallerScreen ? (
          <div
            className="report-return-title"
            style={{
              color: theme.font_color,
            }}
          >
            <i
              className="bx bx-left-arrow report-icon"
              onClick={() => navigate("/reports")}
            ></i>
            <div>Report</div>
          </div>
        ) : null}
        <div
          className="report-contents"
          style={{
            border: `2px solid ${theme.border}`,
            color: theme.font_color,
            background: theme.primary_color,
          }}
        >
          {Object.keys(report).map(
            (detail) =>
              detail !== "id" &&
              detail !== "comments" && (
                <div
                  className="report-details"
                  key={detail}
                  style={{ borderBottom: `1px solid ${theme.border}` }}
                >
                  <div className="report-title">
                    {capitalizeFirstLetter(detail)}:
                  </div>
                  <div className="report-detail">{report[detail]}</div>
                </div>
              )
          )}
          <div className="report-button-container">
            <button
              className="report-delete-button"
              onClick={handleDeleteReport}
              style={{
                border: smallerScreen ? 'none' : `2px solid ${theme.border}`,
                background: theme.background_color,
                color: theme.font_color,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Comments
        report={report}
        timeStamp={timeStamp}
        theme={theme}
        smallerScreen={smallerScreen}
      />

      <div
        className="report-attachments-container"
        style={{
          background: theme.primary_color,
          border: `2px solid ${theme.border}`,
          color: theme.font_color,
        }}
      >
        <div
          className="report-attachments-title"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          Attachments
        </div>
        <div className="report-attachments-content">
          <div className="report-attachments-saved">
            {savedFiles.map((file, index) => (
              <>
                <Link
                  className="report-attachments-saved-files"
                  key={index}
                  href={file.url}
                  target="_blank"
                >
                  {file.name}
                </Link>
                <div className="report-attachments-button-container">
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
          className="report-attachments-box"
          style={{ border: `2px solid ${theme.border}` }}
        >
          <button
            className="report-attachments-button"
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
            className={`report-attachments-drop ${
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
              <div className="report-attachments-file">
                {droppedFiles[droppedFiles.length - 1].name}
              </div>
            ) : (
              <>
                {smallerScreen ? (
                  <div className="report-attachments-link">
                    <label htmlFor="file-input">Add a file</label>
                  </div>
                ) : (
                  <div className="report-attachments-link">
                    {isDraggingPage
                      ? "Drop files here or "
                      : "Drag files here or "}{" "}
                    <label htmlFor="file-input">browse</label>
                  </div>
                )}

                <input
                  className="report-attachment-file-input"
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

export default Report;
