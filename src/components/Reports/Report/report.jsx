import { useState } from "react";
import "./report.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReport,
  selectReportById,
  fetchReports,
} from "../reportSlice";
import Comments from "./Comments/comments";
import ReportAttachments from "./Attachments/attachments";
import useWindowSize from "../../../Hooks/useWindowSize";
import { capitalizeFirstLetter } from "../../../../Utils/utils";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import useAuth from "../../../Hooks/useAuth";
import { fetchUsers } from "../../Users/userSlice";

function Report() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reportId } = useParams();
  const report = useSelector((state) => selectReportById(state, reportId));
  const theme = useSelector(selectTheme);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [isDraggingPage, setIsDraggingPage] = useState(false);

  const { role } = useAuth();

  const { width } = useWindowSize();
  const smallerScreen = width < 500;

  const handleDeleteReport = async () => {
    if (
      window.confirm(
        `\nAre you sure you want to delete:\n\nReport: ${report.subject}?`
      )
    ) {
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
          await dispatch(fetchUsers());

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
          {role !== "Submitter" && (
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
          )}
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
    </section>
  );
}

export default Report;
