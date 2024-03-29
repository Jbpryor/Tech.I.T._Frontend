import { useState } from "react";
import {
  updateReport,
  fetchReports,
  downloadAttachment,
  deleteAttachment,
} from "../../reportSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../../Utils/utils";
import useAuth from "../../../../Hooks/useAuth";

function Attachments({
  theme,
  smallerScreen,
  report,
  isDraggingPage,
  setIsDraggingPage,
  requestStatus,
  setRequestStatus,
}) {
  const dispatch = useDispatch();
  const attachments = report.attachments;
  const { userName } = useAuth();

  if (!attachments) {
    return (
      <div
        className="report-attachments-container"
        style={{
          background: theme.primary_color,
          border: `2px solid ${theme.border}`,
          color: theme.font_color,
        }}
      >
        No Attachments found
      </div>
    );
  }

  const [file, setFile] = useState();
  const [droppedFile, setDroppedFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [savedFiles, setSavedFiles] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setIsDraggingPage(false);
    setFile(event.dataTransfer.files[0]);
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    setDroppedFile(true);
  };

  const handleSaveAttachment = async () => {
    const formData = new FormData();
    formData.append("_id", report._id);
    formData.append("file", file);
    formData.append("userName", userName);

    try {
      setRequestStatus("pending");

      const response = await dispatch(updateReport(formData));

      if (updateReport.fulfilled.match(response)) {
        await dispatch(fetchReports());

        setFile(null);
        setDroppedFile(false);
      } else {
        const { message } = response.error;
        alert("Attachment not added: " + message);
      }
    } catch (error) {
      console.error("Failed to save the attachment", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const handleDeleteAttachment = async (attachment) => {
    const { fileId } = attachment;
    if (window.confirm(`Are you sure you want to delete this attachment?`)) {
      try {
        setRequestStatus("pending");

        const response = await dispatch(
          deleteAttachment({ reportId: report._id, fileId: fileId })
        );

        if (deleteAttachment.fulfilled.match(response)) {
          const { message } = response.payload;

          alert(message);

          await dispatch(fetchReports());
        } else {
          console.log("Error deleting the attachment:", response);
        }
      } catch (error) {
        console.error("Failed to delete the attachment", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const [isAttachmentMenuVisible, setIsAttachmentMenuVisible] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [fileContent, setFileContent] = useState();

  const handleAttachmentClick = (attachment) => {
    setIsAttachmentMenuVisible(true);
    setSelectedAttachment(attachment);
  };

  const handleViewAttachment = async (attachment) => {
    const { fileId } = attachment;
    setIsAttachmentMenuVisible(false);

    try {
      setRequestStatus("pending");

      const response = await dispatch(
        downloadAttachment({ reportId: report._id, fileId: fileId })
      );

      const { contentType, data } = response.payload;
      const isImage = contentType.startsWith("image/");
      const isPDF = contentType === "application/pdf";

      if (isImage) {
        setFileContent(
          <img src={`data:${contentType};base64,${data}`} alt="Attachment" />
        );
      } else if (isPDF) {
        setFileContent(
          <iframe src={`data:${contentType};base64,${data}`} />);
      } else {
        setFileContent();
      }
    } catch (error) {
      console.error("Error fetching file data URL", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const handleDownloadAttachment = async (attachment) => {
    const { fileId } = attachment;
    setIsAttachmentMenuVisible(false);

    try {
      setRequestStatus("pending");

      const response = await dispatch(
        downloadAttachment({ reportId: report._id, fileId: fileId })
      );

      const { data, contentType } = response.payload;

      const decodedData = atob(data);
      const byteNumbers = new Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        byteNumbers[i] = decodedData.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: contentType });

      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = attachment.originalName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading attachment", error);
    }
  };

  return (
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
        {attachments.map(
          (attachment, index) =>
            index < 3 && ( //switch this to max height and have a scroll or a new window for viewing attachments index greater than 3
              <div className="report-attachments-saved" key={index}>
                <div className="report-attachments-saved-files">
                  <div className="attachment-user">{attachment.userName}</div>
                  <div
                    className="attachment-name"
                    onClick={() => handleAttachmentClick(attachment)}
                  >
                    {attachment.originalName}
                  </div>
                  <div className="attachment-date">
                    {formatTimestamp(attachment.uploadDate)}
                  </div>
                </div>
                <div className="report-attachments-button-container">
                  {smallerScreen ? (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteAttachment(attachment)}
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
                      onClick={() => handleDeleteAttachment(attachment)}
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
              </div>
            )
        )}

        <div
          className={`menu-overlay ${isAttachmentMenuVisible ? "active" : ""}`}
        >
          <div
            className={`attachments-menu ${
              isAttachmentMenuVisible ? "active" : ""
            }`}
            style={{
              background: theme.primary_color,
              border: `2px solid ${theme.border}`,
              color: theme.font_color,
            }}
          >
            <label className="attachment-label">
              {selectedAttachment?.originalName}
            </label>
            <div className="attachment-button-container">
              <button
                className="view-attachment-button"
                onClick={() => handleViewAttachment(selectedAttachment)}
                style={{
                  border: `1px solid ${theme.border}`,
                  background: theme.background_color,
                  color: theme.font_color,
                }}
              >
                View
              </button>
              <button
                className="download-attachment-button"
                onClick={() => handleDownloadAttachment(selectedAttachment)}
                style={{
                  border: `1px solid ${theme.border}`,
                  background: theme.background_color,
                  color: theme.font_color,
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="report-attachments-box"
        style={{ border: `2px solid ${theme.border}` }}
      >
        <button
          className="report-attachments-button"
          onClick={handleSaveAttachment}
          disabled={!file}
          style={{
            border: `2px solid ${theme.border}`,
            color: theme.font_color,
            background: theme.primary_color,
          }}
        >
          +
        </button>
        <div
          className={`report-attachments-drop ${isDragging ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: `5px dotted ${theme.border}`,
            background: theme.background_color,
          }}
        >
          {file ? (
            <div className="report-attachments-file">{file.name}</div>
          ) : (
            <>
              {smallerScreen ? (
                <div className="report-attachments-link">
                  <label htmlFor="file">Add a file</label>
                </div>
              ) : (
                <div className="report-attachments-link">
                  {isDraggingPage
                    ? "Drop files here or "
                    : "Drag files here or "}{" "}
                  <label htmlFor="file">browse</label>
                </div>
              )}
              <input
                className="report-attachment-file-input"
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={handleFileInputChange}
              />
            </>
          )}
        </div>
      </div>

      {fileContent}
    </div>
  );
}

export default Attachments;
