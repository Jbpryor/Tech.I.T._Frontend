import { useState } from "react";
import { updateIssue, fetchIssues, deleteComment } from "../../issueSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../../Utils/utils";
import useAuth from "../../../../Hooks/useAuth";

function Comments({ issue, theme, smallerScreen, setIsLoading }) {
  const dispatch = useDispatch();

  const comments = issue.comments;

  const [comment, setComment] = useState("");

  const { userName } = useAuth()

  const handleInputChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleSaveComment = async () => {
    const newComment = {
      userName: userName,
      comment: comment,
    };

    try {
      setIsLoading(true);

      const response = await dispatch(
        updateIssue({ _id: issue._id, comments: newComment })
      );

      if (updateIssue.fulfilled.match(response)) {
        setIsLoading(false);

        await dispatch(fetchIssues());

        setComment("");
      } else {
        const { message } = response.error
        alert("Comment not added: " + message);
      }
    } catch (error) {
      console.error("Failed to save the comment", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (index, commentId) => {
    if (window.confirm(`Are you sure you want to delete this comment?`)) {
      try {
        setIsLoading(true);

        const response = await dispatch(
          deleteComment({ issueId: issue._id, commentIndex: index, commentId: commentId })
        );

        if (deleteComment.fulfilled.match(response)) {
          setIsLoading(false);
          const { message } = response.payload;

          alert(message);

          await dispatch(fetchIssues());

        } else {
            const { message } = response.error
          console.log("Error deleting comment:", message);
        }
      } catch (error) {
        console.error("Failed to delete the comment", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="issue-comments-container"
      style={{
        background: theme.primary_color,
        color: theme.font_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="issue-comments-title">Comments</div>
      <div className="issue-comments-input-container">
        <input
          type="text"
          className="issue-comments-input"
          value={comment}
          placeholder="Enter comment..."
          onChange={handleInputChange}
          style={{
            background: theme.background_color,
            color: theme.font_color,
            border: `1px solid ${theme.border}`,
          }}
        />
        <button
          className="issue-comments-button"
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
      <div className="issue-comments-content">
        {comments.map((comment, index) => (
          <div className="issue-comment-container" key={index}>
            <div className="issue-comments-user-container">
              <div className="issue-comments-user">{comment.userName}</div>
            </div>
            <div className="issue-comment-content">
              <div className="issue-comment">{comment.comment}</div>
            </div>
            <div className="issue-comments-date-container">
              <div className="issue-comments-date">{formatTimestamp(comment.timeStamp)}</div>
            </div>
            <div className="issue-comments-buttons-container">
              <div className="issue-comments-button-container">
                {smallerScreen ? (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(index, comment._id)}
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
                    onClick={() => handleDeleteComment(index, comment._id)}
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
