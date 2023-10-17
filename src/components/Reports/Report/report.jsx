import React, { useState, useEffect } from "react";
import './report.scss';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport } from "../../../Store/Slices/reportSlice";

function Report() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const { reportId } = useParams();
  const report = reports.find((report) => report.id.toString() === reportId);

  const handleDeleteReport = () => {
    dispatch(deleteReport(report.id))
    navigate('/reports')
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
    <section className={`report ${isDraggingPage ? 'dragging' : ''}`} onDragOver={handlePageDragOver} onDragLeave={handlePageDragLeave}>
      <div className="report-container">
        <div className="report-contents">
          {Object.keys(report).map((detail) => (
            detail !== 'id' && (
              <div className="report-details" key={detail}>
                <div className="report-title">{capitalizeFirstLetter(detail)}:</div>
                <div className="report-detail">{report[detail]}</div>
              </div>
              ))
            )
          }
          <div className='report-buttons-container'>
            <button onClick={handleDeleteReport}>Delete</button>
          </div>
        </div>         
        <div className="new-report-link-container">
          <Link to='/reports/newReport' className="new-report-link">New Report +</Link>
        </div> 
      </div>
      <div className="report-comments-container">
        <div className="report-comments-title">Comments</div>
        <div className="report-comments-input-container">
          <input type="text" className="report-comments-input" placeholder="Enter comment..." />
          <button className="report-comments-button">+</button>
        </div>
        <div className="report-comments-content">
          <div className="report-comments-user-container">
            <div className="report-comments-user">Jason Brent Pryor</div>            
          </div>
          <div className="report-comment-container">
            <div className="report-comment">You need to use more black in this area right here now and forever</div>
          </div>
          <div className="report-comments-date-container">
            <div className="report-comments-date">09/15/2023</div>
          </div>
          <div className="report-comments-buttons-container">
            <div className="report-comments-button-container">
              <button className="delete-button">delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className='report-attachments-container'>
        <div className="report-attachments-title">Attachments</div>
        <div className="report-attachments-content">
          <div className="report-attachments-saved">
            {savedFiles.map((file, index) => (
              <>
                <Link className="report-attachments-saved-files" key={index} href={file.url} target="_blank">{file.name}</Link>
                <div className="report-attachments-button-container">
                  <button className="delete-button" onClick={() => handleDeleteFile(index)}>delete</button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="report-attachments-box">
          <button className="report-attachments-button" onClick={handleSaveUpload}>+</button>
          <div className={`report-attachments-drop ${isDragging ? 'drag-over' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            {droppedFiles.length > 0 && droppedFiles[droppedFiles.length - 1] ? (
              <div className="report-attachments-file">{droppedFiles[droppedFiles.length - 1].name}</div>) : (
              <>
                <div className="report-attachments-link" >
                  {isDraggingPage ? 'Drop files here or ' : 'Drag files here or '} <label htmlFor="file-input">browse</label>
                </div>
                <input className='report-attachment-file-input' type="file" id="file-input" accept='.jpg, .jpeg, .png, .pdf' onChange={handleFileInputChange}/>
              </>
            )}
          </div>
        </div>
      </div>        
    </section>
  )
}

export default Report;