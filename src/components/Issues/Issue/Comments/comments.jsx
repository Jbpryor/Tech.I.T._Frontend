import React, { useState } from "react";
import { addComment, deleteComment } from "../../../../Store/Slices/issueSlice";
import { useDispatch } from "react-redux";
import { formatTimestamp } from "../../../../main";

function Comments({ issue, timeStamp, theme, smallerScreen }) {

    const dispatch = useDispatch();

    const comments = issue.comments || [];

    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setComment(value);
    };

    const handleSaveComment = () => {   

        const newComment = {
            userName: 'John Test',
            comment: comment,
            timeStamp: formatTimestamp(timeStamp),
        };
    
        dispatch(addComment({ issueId: issue.id, comments: newComment }));

        setComment('');
    };

    const handleDeleteComment = (index) => {
        dispatch(deleteComment({ issueId: issue.id, commentIndex: index }));
    }


    return(
        <div className="issue-comments-container" style={{ background: theme.primary_color, color: theme.font_color, border: `2px solid ${theme.border}` }} >
            <div className="issue-comments-title">Comments</div>
            <div className="issue-comments-input-container">
                <input type="text" className="issue-comments-input" value={comment} placeholder="Enter comment..." onChange={handleInputChange} style={{ background: theme.background_color, color: theme.font_color }} />
                <button className="issue-comments-button" onClick={handleSaveComment} style={{ background: theme.primary_color, color: theme.font_color, border: `2px solid ${theme.border}` }} >+</button>
            </div>
            <div className="issue-comments-content">
                {comments.map((comment, index) => (
                    <div className='issue-comment-container' key={index} >
                        <div className="issue-comments-user-container">
                            <div className="issue-comments-user">{comment.userName}</div>            
                        </div>
                        <div className="issue-comment-content">
                            <div className="issue-comment">{comment.comment}</div>
                        </div>
                        <div className="issue-comments-date-container">
                            <div className="issue-comments-date">{comment.timeStamp}</div>
                        </div>
                        <div className="issue-comments-buttons-container">
                            <div className="issue-comments-button-container">
                                {smallerScreen ? (
                                    <button className="delete-button" onClick={() => handleDeleteComment(index)} style={{ background: 'none', color: theme.font_color, border: 'none', boxShadow: 'none' }} >X</button>
                                ) : (
                                    <button className="delete-button" onClick={() => handleDeleteComment(index)} style={{ background: theme.primary_color, color: theme.font_color, border: `2px solid ${theme.border}` }} >delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </div>
    )
}

export default Comments;