import React, { useState, useEffect } from "react";
import './issue.scss';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteIssue, modifyIssue, addModifications } from "../../../Store/issueSlice";

function Issue() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const issues = useSelector((state) => state.issues);
  const projects = useSelector((state) => state.projects);

  const { issueId } = useParams();
  const [ isEditMode, setEditMode ] = useState({});
  const [ showSaveButton, setShowSaveButton ] = useState(false);
  const [ editedDetail, setEditedDetail ] = useState({});
  const [ , setShowUpdatedField ] = useState(false);

  const issue = issues.find((issue) => issue.id.toString() === issueId);
  
  const timeStamp = new Date().toISOString();

  const [ modification, setModification ] = useState(null);
  const [ previousState, setPreviousState ] = useState({});
  const [ currentState, setCurrentState ] = useState({});

  const handleEdit = (detail) => {;
    setPreviousState((prev) => ({
      ...prev,
      [detail]: issue[detail],
    }));
    setEditMode({ ...isEditMode, [detail]: true })
    setShowSaveButton(true);
    setShowUpdatedField(true);
  };

  const handleDetailChange = (event, detail) => {
    const { value } = event.target;
    setEditedDetail((prevEditedDetail) => ({
      ...prevEditedDetail,
      [detail]: value,
    }));
    setCurrentState((prev) => ({
      ...prev,
      [detail]: value,
    }));
  };


  const handleCancel = (detail) => {
    setEditMode({ ...isEditMode, [detail]: false });
    delete editedDetail[detail];
    setEditedDetail({ ...editedDetail });
    setModification(null);
  }

  const saveEditedIssue = () => {

    const pairedStates = {};

    for (const [key, value] of Object.entries(currentState)) {
      if (previousState.hasOwnProperty(key)) {
        pairedStates[key] = {
          previousState: previousState[key],
          currentState: value,
          modified: timeStamp,
        };
      }
    }

    const updatedIssue = {
      ...issue,
      ...editedDetail,
    };

    dispatch(modifyIssue(updatedIssue));
    dispatch(addModifications({issueId: issue.id, modifications: pairedStates }));
  

    setEditedDetail({});
    setEditMode({});
    setShowSaveButton(false);
    setModification(null);
  };

  const handleDeleteIssue = () => {
    dispatch(deleteIssue(issue.id))
    navigate('/issues')
  }

  const [ droppedFiles, setDroppedFiles ] = useState([]);
  const [ droppedFile, setDroppedFile ] = useState(false);
  const [ isDraggingPage, setIsDraggingPage ] = useState(false);
  const [ isDragging, setIsDragging ] = useState(false);
  const [ savedFiles, setSavedFiles ] = useState([]);
  const [ isModificationsViewActive, setModificationsViewActive ] = useState(false);

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

  const toggleModificationView = () => {
    setModificationsViewActive(!isModificationsViewActive);
  }

  return (    
    <section className={`issue ${isDraggingPage ? 'dragging' : ''}`} onDragOver={handlePageDragOver} onDragLeave={handlePageDragLeave}>
      {isModificationsViewActive ? (
        <div className="modifications-container">
          <div className="modifications-content"></div>
          <button className="issues-view-button" onClick={toggleModificationView}>Back to issues</button>
        </div>
      ) : (
        <div className="issue-container">
          <div className="issue-content">
            {Object.keys(issue).map((detail) => (
              detail !== 'id' && detail !== 'modifications' && (
                <div className="issue-details" key={detail}>
                  <div className="issue-title">{capitalizeFirstLetter(detail)}:</div>
                  {isEditMode[detail] && detail === 'type' ? (
                    <select className='issue-detail' value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                      <option value="">Select a type...</option>
                      <option value="Bug">Bug</option>
                      <option value="Feature">Feature</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Crash">Crash</option>
                      <option value="Task">Task</option>               
                    </select>
                  ) : isEditMode[detail] && detail === 'status' ?
                  (
                    <select className='issue-detail' value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Postponed">Postponed</option>
                      <option value="Closed">Closed</option>                    
                    </select>
                  ) : isEditMode[detail] && detail === 'project' ? 
                  (
                    <select className="issue-detail" value={editedDetail[detail] || issue[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                      {projects.map((project) => (
                        <option value={project.title}>{project.title}</option>
                      ))}
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
                  {detail === 'modified' ? (
                    <button className="modifications-view-button" onClick={toggleModificationView}>View</button>
                  ): isEditMode[detail] ? (
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
      )}
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