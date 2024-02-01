import React, { useState } from "react";
import { updateReport, deleteComment } from "../../reportSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../../Utils/utils";

function Comments({ report, timeStamp, theme, smallerScreen, requestStatus, setRequestStatus }) {
  const dispatch = useDispatch();

  const comments = report.comments;

  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleSaveComment = async () => {
    const newComment = {
      userName: "John Test",
      comment: comment,
    };

    try {
      setRequestStatus("pending");

      const response = await dispatch(
        updateReport({ _id: report._id, comments: newComment })
      );

      if (updateReport.fulfilled.match(response)) {

        await dispatch(fetchReports());

        setComment("");
      } else {
        const { message } = error.response
        alert("Comment not added: " + message);
      }
    } catch (error) {
      console.error("Failed to save the comment", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const handleDeleteComment = async (index, commentId) => {
    if (window.confirm(`Are you sure you want to delete this comment?`)) {
      try {
        setRequestStatus("pending");

        const response = await dispatch(
          deleteComment({ reportId: report._id, commentIndex: index, commentId: commentId })
        );

        if (deleteComment.fulfilled.match(response)) {
          const { message } = response.payload;
          console.log("CommentRes:", response)

          alert(message);

          await dispatch(fetchReports());

        } else {
            const { message } = response.error
          console.log("Error deleting comment:", message);
        }
      } catch (error) {
        console.error("Failed to delete the comment", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  return (
    <div
      className="report-comments-container"
      style={{
        background: theme.primary_color,
        color: theme.font_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="report-comments-title">Comments</div>
      <div className="report-comments-input-container">
        <input
          type="text"
          className="report-comments-input"
          value={comment}
          placeholder="Enter comment..."
          onChange={handleInputChange}
          style={{
            background: theme.background_color,
            color: theme.font_color,
            border: `2px solid ${theme.border}` 
          }}
        />
        <button
          className="report-comments-button"
          onClick={handleSaveComment}
          style={{
            background: theme.primary_color,
            color: theme.font_color,
            border: `2px solid ${theme.border}`,
          }}
        >
          +
        </button>
      </div>
      <div className="report-comments-content">
        {comments.map((comment, index) => (
          <div className="report-comment-container" key={index}>
            <div className="report-comments-user-container">
              <div className="report-comments-user">{comment.userName}</div>
            </div>
            <div className="report-comment-content">
              <div className="report-comment">{comment.comment}</div>
            </div>
            <div className="report-comments-date-container">
              <div className="report-comments-date">{comment.timeStamp}</div>
            </div>
            <div className="report-comments-buttons-container">
              <div className="report-comments-button-container">
                {smallerScreen ? (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(index)}
                    style={{
                      background: 'none',
                      color: theme.font_color,
                      border: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    X
                  </button>
                ) : (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(index)}
                    style={{
                      background: theme.primary_color,
                      color: theme.font_color,
                      border: `2px solid ${theme.border}`,
                    }}
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
