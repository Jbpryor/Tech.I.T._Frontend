import React, { useState, useEffect } from "react";
import './issue.scss';
import { useParams, Link } from "react-router-dom/dist";

export const issues = [
    {
    id: 'issue-1',
    title: 'issue-1',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    id: 'issue-2',
    title: 'issue-2',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    id: 'issue-3',
    title: 'issue-3',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    id: 'issue-4',
    title: 'issue-4',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    id: 'issue-5',
    title: 'issue-5',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    id: 'issue-6',
    title: 'issue-6',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  }
];


function Issue() {

    const { issueId } = useParams();
    const [ isEditMode, setEditMode ] = useState({});
    const [ showSaveButton, setShowSaveButton ] = useState(false);
    const [ editedDetail, setEditedDetail ] = useState({});
    // const issues = useSelector((state) => state.issues.issue);

    const issue = issues.find((issue) => issue.id === issueId)

    const handleEdit = (detail) => {
      setEditMode({ ...isEditMode, [detail]: true })
      setShowSaveButton(true);
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
      setEditedDetail({ ...editedDetail })
    }

    const saveEditedIssue = () => {
      setEditedDetail({});
      setEditMode({});
      setShowSaveButton(false);
      // updatedIssue.updated = new Date().toISOString();
    };

    const handleDeleteIssue = () => {

    }

    return (      
      <section className="issue">
        <div className="issue-container">
          <div className="issue-contents">
            {Object.keys(issue).map((detail) => (
              detail !== 'id' && (
                <div className="issue-details" key={detail}>
                  <div className="issue-title">{capitalizeFirstLetter(detail)}:</div>
                  {isEditMode[detail] && detail === 'status' ?
                  (
                    <select className='issue-detail' value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Postponed">Postponed</option>
                      <option value="Closed">Closed</option>                    
                    </select>
                  ) : isEditMode[detail] && detail === 'priority' ? 
                  (
                    <select className="issue-detail" value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                      <option value='Critical'>Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  ) : isEditMode[detail] ? 
                  (
                    <input className='issue-detail' type='text' value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)} />
                  ) :
                  (
                    <div className="issue-detail">{editedDetail[detail] || issue[detail]}</div>
                  )}
                  {isEditMode[detail] ? (
                    <button onClick={() => handleCancel(detail)}>Cancel</button>
                  ): (
                    <button onClick={() => handleEdit(detail)}>Modify</button>
                  )}
                </div>
                ))
              )
            }
            <div className='issue-buttons-container'>
              {!showSaveButton && <button onClick={handleDeleteIssue}>Delete</button>}
              {showSaveButton && <button className="save" onClick={saveEditedIssue}>Save</button>}
            </div>
          </div>         
          <div className="new-issue-link-container">
            <Link to='/issues/newIssue' className="new-issue-link">New Issue +</Link>
          </div> 
        </div>
        <div className="issue-comments-container">
          <div className="issue-comments-title">Comments</div>
          <div className="issue-comments-input-container">
            <input type="text" className="issue-comments-input" placeholder="Enter comment..." />
            <button className="issue-comments-button">+</button>
          </div>
          <div className="issue-comments-content">
            <div className="issue-comments-user">Jason Brent Pryor</div>
            <div className="issue-comments">You need to use more black in this area</div>
            <div className="issue-comments-user">Jason Brent Pryor</div>
            <div className="issue-comments">You need to use more black in this area</div>
            <div className="issue-comments-user">Jason Brent Pryor</div>
            <div className="issue-comments">You need to use more black in this area</div>
            <div className="issue-comments-user">Jason Brent Pryor</div>
            <div className="issue-comments">You need to use more black in this area</div>
            <div className="issue-comments-user">Jason Brent Pryor</div>
            <div className="issue-comments">You need to use more black in this area</div>
          </div>
        </div>
        <div className="issue-attachments-container">
          <div className="issue-attachments-title">Attachments</div>
          <div className="issue-attachments-progress"></div>
          <div className="issue-attachments-box">
            <button className="issue-attachments-button">+</button>
            <div className="issue-attachments-drop">
              <div className="issue-attachments-link">
                Drag files here or <span>browse</span>
              </div>
            </div>
          </div>
        </div>        
      </section>
    )
}
 
export default Issue;