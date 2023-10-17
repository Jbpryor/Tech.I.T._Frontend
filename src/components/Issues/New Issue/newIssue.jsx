import React, { useEffect, useState } from "react";
import './newIssue.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addIssue } from "../../../Store/Slices/issueSlice";
import { issueDetails } from "../../../Constants/issueDetails";

function NewIssue() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newId, setNewId ] = useState(0);
    const users = useSelector((state) => state.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const issues = useSelector((state) => state.issues);
    const projects = useSelector((state) => state.projects);

    const newIssue = {};

    issueDetails.forEach((detail) => {
        newIssue[detail.toLowerCase()] = inputValues[detail] || '';
    });
    
    newIssue.id = newId;
    newIssue.created = currentDate;

    const handleInputChange = (event, detail) => {
        const { value } = event.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [detail]: value,
        }));
    };

    const handleCurrentDate = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;

        const formattedDate =  `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`.trim();

        setCurrentDate(formattedDate);
    }

    const handleSaveNewIssue = (event) => {
        event.preventDefault();

        dispatch(addIssue(newIssue));

        alert('New issue was created!')

        setInputValues({});
        navigate(`/issues/${newIssue.id}`)
    }

    useEffect(() => {
        handleCurrentDate();
        if (issues && issues.length > 0) {
          const highestId = Math.max(...issues.map((issue) => issue.id), 0);
          setNewId(highestId + 1);
        } else {
          setNewId(1);
        }
    }, []);

    return (
        <section className="new-issue">
            <div className="new-issue-container">
                <div className="new-issue-title">New Issue</div>
                <form className="new-issue-form">
                    {issueDetails.map((detail) => (
                        <div key={detail} className="new-issue-details">
                            <div className="new-issue-detail">{detail}:</div>
                                {detail === 'Id' ? (
                                <div className="new-issue-input id">Issue-{newId}</div>
                            ) : detail === 'Type' ? (
                                <select className='new-issue-input' value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a type...</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Crash">Crash</option>
                                    <option value="Task">Task</option>               
                                </select>
                            ) : detail === 'Status' ? (
                                <select className='new-issue-input' value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a status...</option>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Postponed">Postponed</option>
                                    <option value="Closed">Closed</option>                
                                </select>
                            ) : detail === 'Priority' ? (
                                <select className="new-issue-input" value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value=''>Select a priority level...</option>
                                    <option value='Critical'>Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            ) : detail === 'Project' ? (
                                <select className="new-issue-input" value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a project...</option>
                                    {projects.map((project, index) => (
                                        <option key={index} value={`${project.title}`}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Submitter' ? (
                                <select className="new-issue-input" value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Submitter...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Developer' ? (
                                <select className="new-issue-input" value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Developer...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>
                            ) : detail === 'Created' ? (
                                <div className="new-issue-input date">{currentDate}</div>          
                            ) : detail === 'Description' ? (
                                <textarea type="text" className="new-issue-input description" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            ) : (
                                <input type="text" className="new-issue-input text" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
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