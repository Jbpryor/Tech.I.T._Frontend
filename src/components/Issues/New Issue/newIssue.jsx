import React, { useState } from "react";
import './newIssue.scss';
import { useLocation } from "react-router-dom";

function NewIssue() {
    const [ editedDetail, setEditedDetail ] = useState({});

    const location = useLocation();


    const issueDetails = [
        'Id',
        'Title',
        'Project',
        'Status',
        'Created',
        'Description',
        'Submitter',
        'Priority',
        'Type',
    ];

    const [ inputValues, setInputValues ] = useState({});

    const handleInputChange = (event, detail) => {
        const { value } = event.target;
        setInputValues({
            ...inputValues,
            [detail]: value,
        });
    };

    const handleSaveNewIssue = () => {

    }

    const handleDetailChange = () => {

    }


    return (
        <section className="new-issue">
            <div className="new-issue-container">
                <div className="new-issue-title">New Issue</div>
                <form className="new-issue-form">
                    {issueDetails.map((detail) => (
                        <div key={detail} className="new-issue-details">
                            <div className="new-issue-detail">{detail}:</div>
                            {detail === 'Project' ? (
                                <select name="" id="" className="new-issue-input">
                                    <option value="">CurrentProjects</option>
                                </select>
                            ) : detail === 'Status' ? (
                                <select className='new-issue-input' value={editedDetail[detail] || issueDetails[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Postponed">Postponed</option>
                                    <option value="Closed">Closed</option>                    
                                </select>
                            ) : detail === 'Created' ? (
                                <div className="new-issue-input">CurrentDate</div>
                            ) : detail === 'Submitter' ? (
                                <select name="" id="" className="new-issue-input">
                                    <option value="">Submitter</option>
                                </select>
                            ) : detail === 'Priority' ? (
                                <select className="new-issue-input" value={editedDetail[detail] || issueDetails[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                                    <option value='Critical'>Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            ) : (
                                <input type="text" className="new-issue-input" placeholder={`Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            )}                    
                        </div>
                    ))}
                </form>
                <div className="new-issue-button">
                    <button onClick={handleSaveNewIssue}>Create</button>
                </div>
            </div>
        </section>
    )
}

export default NewIssue;