import React, { useState } from "react";
import {
  updateIssue,
  fetchIssues,
  downloadAttachment,
  deleteAttachment,
} from "../../issueSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../../Utils/utils";
import useAuth from "../../../../Hooks/useAuth";

function Attachments({
  theme,
  smallerScreen,
  issue,
  isDraggingPage,
  setIsDraggingPage,
  requestStatus,
  setRequestStatus,
}) {
  const dispatch = useDispatch();
  const attachments = issue.attachments;
  const { userName } = useAuth();

  if (!attachments) {
    return (
      <div
        className="issue-attachments-container"
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
  const [isDragging, setIsDragging] = useState(false);

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
  };

  const handleSaveAttachment = async () => {
    const formData = new FormData();
    formData.append("_id", issue._id);
    formData.append("file", file);
    formData.append("userName", userName); // need to make this the current user

    try {
      setRequestStatus("pending");

      const response = await dispatch(updateIssue(formData));

      if (updateIssue.fulfilled.match(response)) {
        await dispatch(fetchIssues());

        setFile(null);
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
          deleteAttachment({ issueId: issue._id, fileId: fileId })
        );

        if (deleteAttachment.fulfilled.match(response)) {
          const { message } = response.payload;

          alert(message);

          await dispatch(fetchIssues());
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
  const [displayAttachment, setDisplayAttachment] = useState(false);

  const handleAttachmentClick = (attachment) => {
    setIsAttachmentMenuVisible(true);
    setSelectedAttachment(attachment);
  };

  const handleViewAttachment = async (attachment) => {
    const { fileId } = attachment;
    setIsAttachmentMenuVisible(false);
    setDisplayAttachment(true);

    try {
      setRequestStatus("pending");

      const response = await dispatch(
        downloadAttachment({ issueId: issue._id, fileId: fileId })
      );

      const { contentType, data } = response.payload;
      const isImage = contentType.startsWith("image/");
      const isPDF = contentType === "application/pdf";

      if (isImage) {
        setFileContent(
          <img src={`data:${contentType};base64,${data}`} alt="Attachment" />
        );
      } else if (isPDF) {
        setFileContent(<iframe src={`data:${contentType};base64,${data}`} />);
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
        downloadAttachment({ issueId: issue._id, fileId: fileId })
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
        {attachments.map(
          (attachment, index) =>
            index < 3 && ( //switch this to max height and have a scroll or a new window for viewing attachments index greater than 3
              <div className="issue-attachments-saved" key={index}>
                <div className="issue-attachments-saved-files">
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
                <div className="issue-attachments-button-container">
                  {smallerScreen ? (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteAttachment(attachment)}
                      style={{
                        background: "none",
                        color: theme.font_color,
                        border: "none",
                        boxShadow: "none",
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
        className="issue-attachments-box"
        style={{ border: `2px solid ${theme.border}` }}
      >
        <button
          className="issue-attachments-button"
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
          className={`issue-attachments-drop ${isDragging ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: `5px dotted ${theme.border}`,
            background: theme.background_color,
          }}
        >
          {file ? (
            <div className="issue-attachments-file">{file.name}</div>
          ) : (
            <>
              {smallerScreen ? (
                <div className="issue-attachments-link">
                  <label htmlFor="file">Add a file</label>
                </div>
              ) : (
                <div className="issue-attachments-link">
                  {isDraggingPage
                    ? "Drop files here or "
                    : "Drag files here or "}{" "}
                  <label htmlFor="file">browse</label>
                </div>
              )}
              <input
                className="issue-attachment-file-input"
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
      <div
        className={`attachment-overlay ${displayAttachment ? "active" : ""}`}
      >
        <div
          className="attachment-container"
          style={{
            border: `${smallerScreen ? "none" : `2px solid ${theme.border}`}`,
            color: theme.font_color,
            background: theme.primary_color,
          }}
        >
          <div
            className="attachment-header"
            style={{
              borderBottom: `${smallerScreen ? "none" : `2px solid ${theme.border}`}`,
              color: theme.font_color,
              background: theme.primary_color,
            }}
          >
            <button
              className="close-attachment-button"
              onClick={() => setDisplayAttachment(false)}
              style={{
                border: `${
                  smallerScreen ? "none" : `2px solid ${theme.border}`
                }`,
                color: theme.font_color,
                background: theme.primary_color,
              }}
            >
              X
            </button>
          </div>
          <div className="attachment-content">{fileContent}</div>
        </div>
      </div>
    </div>
  );
}

export default Attachments;
