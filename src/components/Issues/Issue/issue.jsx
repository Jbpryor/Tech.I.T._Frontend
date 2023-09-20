import React, { useState, useEffect } from "react";
import './issue.scss';
import { useParams, Link } from "react-router-dom/dist";
import { useSelector, useDispatch } from "react-redux";
import { deletIssue } from "../../../Store/issueSlice";


// export const issues = [
//     {
//     id: 'issue-1',
//     title: 'issue-1',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   },
//     {
//     id: 'issue-2',
//     title: 'issue-2',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   },
//     {
//     id: 'issue-3',
//     title: 'issue-3',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   },
//     {
//     id: 'issue-4',
//     title: 'issue-4',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   },
//     {
//     id: 'issue-5',
//     title: 'issue-5',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   },
//     {
//     id: 'issue-6',
//     title: 'issue-6',
//     developer: "John",
//     project: "Project A",
//     status: "In Progress",
//     created: "2023-08-29",
//     description: "Lorem ipsum...",
//     submitter: "Alice",
//     priority: "High",
//     type: "Bug",
//     updated: "2023-08-30",
//   }
// ];


function Issue() {
  
    const issues = useSelector((state) => state.issue.issues);

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

    const [ droppedFiles, setDroppedFiles ] = useState([]);
    const [ droppedFile, setDroppedFile ] = useState(false);
    const [ isDraggingPage, setIsDraggingPage ] = useState(false);
    const [ isDragging, setIsDragging ] = useState(false);
    const [ savedFiles, setSavedFiles ] = useState([]);

    const handleDragOver = (event) => {
      event.preventDefault();
      setIsDragging(true);
    }

    const handleDragLeave = () => {
      setIsDragging(false);
    }

    const handlePageDragOver = (event) => {
      event.preventDefault();
      setIsDraggingPage(true);
    }

    const handlePageDragLeave = () => {
      setIsDraggingPage(false);
    }

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      setIsDraggingPage(false);
      const files = Array.from(event.dataTransfer.files);
      setDroppedFiles(files);
    }

    const handleFileInputChange = (event) => {
      const files = Array.from(event.target.files);
      setDroppedFiles(files);
      setDroppedFile(true);
    }

    const handleSaveUpload = () => {
      if (droppedFiles.length > 0) {
        setSavedFiles([...savedFiles, ...droppedFiles])
        setDroppedFiles([]);      
      }
    }

    const handleDeleteFile = (index) => {
      const updatedFiles = [...savedFiles];
      updatedFiles.splice(index, 1)
      setSavedFiles(updatedFiles);
    }

    return (      
      <section className={`issue ${isDraggingPage ? 'dragging' : ''}`} onDragOver={handlePageDragOver} onDragLeave={handlePageDragLeave}>
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
            <div className="issue-comments-user-container">
              <div className="issue-comments-user">Jason Brent Pryor</div>            
            </div>
            <div className="issue-comment-container">
              <div className="issue-comment">You need to use more black in this area right here now and forever</div>
            </div>
            <div className="issue-comments-date-container">
              <div className="issue-comments-date">09/15/2023</div>
            </div>
            <div className="issue-comments-buttons-container">
              <div className="issue-comments-button-container">
                <button className="delete-button">delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className='issue-attachments-container'>
          <div className="issue-attachments-title">Attachments</div>
          <div className="issue-attachments-content">
            <div className="issue-attachments-saved">
              {savedFiles.map((file, index) => (
                <>
                  <Link className="issue-attachments-saved-files" key={index} href={file.url} target="_blank">{file.name}</Link>
                  <div className="issue-attachments-button-container">
                    <button className="delete-button" onClick={() => handleDeleteFile(index)}>delete</button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="issue-attachments-box">
            <button className="issue-attachments-button" onClick={handleSaveUpload}>+</button>
            <div className={`issue-attachments-drop ${isDragging ? 'drag-over' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              {droppedFiles.length > 0 && droppedFiles[droppedFiles.length - 1] ? (
                <div className="issue-attachments-file">{droppedFiles[droppedFiles.length - 1].name}</div>) : (
                <>
                  <div className="issue-attachments-link" >
                    {isDraggingPage ? 'Drop files here or ' : 'Drag files here or '} <label htmlFor="file-input">browse</label>
                  </div>
                  <input className='issue-attachment-file-input' type="file" id="file-input" accept='.jpg, .jpeg, .png, .pdf' onChange={handleFileInputChange}/>
                </>
              )}
            </div>
          </div>
        </div>        
      </section>
    )
}
 
export default Issue;