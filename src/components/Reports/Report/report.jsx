import React, { useState, useEffect } from "react";
import "./report.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport, selectReportById, selectAllReports, fetchReports } from "../reportSlice";
import Comments from "./Comments/comments";
import ReportAttachments from "./Attachments/attachments";
import useWindowSize from "../../../Hooks/useWindowSize";
import { capitalizeFirstLetter } from "../../../utils";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";

function Report() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector(selectAllReports);
  const { reportId } = useParams();
  const report = useSelector((state) => selectReportById(state, reportId));
  const theme = useSelector(selectTheme);
  const [requestStatus, setRequestStatus] = useState('idle')
  const [isDraggingPage, setIsDraggingPage] = useState(false);


  const { width } = useWindowSize();
  const smallerScreen = width < 500;

  const handleDeleteReport = async () => {
    if (window.confirm(`Are you sure you want to delete ${report.title}?`)) {
      try {
        setRequestStatus("pending");

        const reportId = {
          _id: report._id,
        };
        const response = await dispatch(deleteReport(reportId));

        if (deleteReport.fulfilled.match(response)) {
          const { message } = response.payload;

          alert(message);

          await dispatch(fetchReports());

          navigate("/reports");
        } else {
          console.log("Error deleting report:", response.payload);
        }
      } catch (error) {
        console.error("Failed to delete the report", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const timeStamp = new Date().toISOString();

  const handlePageDragOver = (event) => {
    event.preventDefault();
    setIsDraggingPage(true);
  };

  const handlePageDragLeave = () => {
    setIsDraggingPage(false);
  };

  if (!report) {
    return (
      <section
        className="report"
        style={{ color: theme.font_color, background: theme.background_color }}
      >
        <div className="report-container">
          <div className="report-null">Report not found</div>
        </div>
      </section>
    );
  }

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
              detail !== "_id" &&
              detail !== "comments" &&
              detail !== "__v" &&
              detail !== "attachments" && (
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
                border: smallerScreen ? "none" : `2px solid ${theme.border}`,
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

      <ReportAttachments
        report={report}
        theme={theme}
        smallerScreen={smallerScreen}
        isDraggingPage={isDraggingPage}
        setIsDraggingPage={setIsDraggingPage}
        requestStatus={requestStatus}
        setRequestStatus={setRequestStatus}
      />

      {/* <div
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
      </div> */}
    </section>
  );
}

export default Report;
