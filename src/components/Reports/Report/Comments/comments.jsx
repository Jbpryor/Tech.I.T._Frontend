import React, { useState } from "react";
import {
  addComment,
  deleteComment,
} from "../../../../Store/Slices/reportSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../main";

function Comments({ report, timeStamp, theme, smallerScreen }) {
  const dispatch = useDispatch();

  const comments = report.comments || [];

  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleSaveComment = () => {
    const newComment = {
      userName: "John Test",
      comment: comment,
      timeStamp: formatTimestamp(timeStamp),
    };

    dispatch(addComment({ reportId: report.id, comments: newComment }));

    setComment("");
  };

  const handleDeleteComment = (index) => {
    dispatch(deleteComment({ reportId: report.id, commentIndex: index }));
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
