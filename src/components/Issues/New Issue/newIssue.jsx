import React, { useEffect, useState } from "react";
import './newIssue.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addIssue } from "../../../Store/issueSlice";

function NewIssue() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newId, setNewId ] = useState(0);
    const users = useSelector((state) => state.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const issues = useSelector((state) => state.issues);



    const location = useLocation();

    const projects = [
        {name: 'project 1'},
        {name: 'project 2'},
        {name: 'project 3'},
        {name: 'project 4'},
        {name: 'project 5'}
    ];

    const issueDetails = [
        'Id',
        'Title',
        'Status',
        'Priority',
        'Project',
        'Developer',
        'Created',
        'Description',
        'Submitter',
        'Type',
    ];

    const newIssue = {
        id: newId,
        title: inputValues['Title'] || '',
        status: inputValues['Status'] || '',
        priority: inputValues["Priority"] || '',
        project: inputValues['Project'] || '',
        developer: inputValues['Developer'] || '',
        created: currentDate,
        description: inputValues['Description'] || '',
        submitter: inputValues['Submitter'] || '',
        type: inputValues['Type'] || ''
    };

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
                                    {projects.map((project, index) => (
                                        <option key={index} value={project.name}>{project.name}</option>))}                                    
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
                            ) : detail === 'Submitter' ? (
                                <select className="new-issue-input" value={issueDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Submitter...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>            
                            ) : detail === 'Description' ? (
                                <input type="text" className="new-issue-input description" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
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