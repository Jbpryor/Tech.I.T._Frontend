import React, { useEffect, useState } from "react";
import './newIssue.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addIssue } from "../../../Store/issueSlice";

function NewIssue() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ editedDetail, setEditedDetail ] = useState({});
    const [ newId, setNewId ] = useState(0);
    const [ selectedUser, setSelectedUser ] = useState(null);
    const [ selectedSubmitter, setSelectedSubmitter ] = useState({ selectedUser: '' });
    const users = useSelector((state) => state.user.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const issues = useSelector((state) => state.issue.issues);



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

    const newIssue = {
        id: newId,
        title: inputValues['Title'] || '',
        project: inputValues['Project'] || '',
        status: editedDetail['Status'] || '',
        created: currentDate,
        description: inputValues['Description'] || '',
        submitter: selectedUser || '',
        priority: editedDetail["Priority"] || '',
        type: inputValues['Type'] || ''
    };

    const handleInputChange = (event, detail) => {
        const { value } = event.target;
        setInputValues({
            ...inputValues,
            [detail]: value,
        });
    };

    const handleCurrentDate = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;

        const formattedDate =  `
        ${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} 
        ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`;

        setCurrentDate(formattedDate);
    }

    const handleDetailChange = (event, detail) => {
        const value = event.target.value;
        setEditedDetail({
            ...editedDetail,
            [detail]: value,
        });
    };

    const handleSaveNewIssue = (event) => {
        event.preventDefault();

        dispatch(addIssue(newIssue));

        alert('New issue was created!')

        setInputValues({});
        setEditedDetail({})
        setSelectedUser(null);
        navigate(`/issue/${newIssue.id}`)
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
                            ) : detail === 'Project' ? (
                                <select className="new-issue-input">
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
                                <div className="new-issue-input date">{currentDate}</div>
                            ) : detail === 'Submitter' ? (
                                <select className="new-issue-input">
                                    <option value="">Select a Submitter...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>
                            ) : detail === 'Priority' ? (
                                <select className="new-issue-input" value={editedDetail[detail] || issueDetails[detail]} onChange={(event) => handleDetailChange(event, detail)}>
                                    <option value='Critical'>Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
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