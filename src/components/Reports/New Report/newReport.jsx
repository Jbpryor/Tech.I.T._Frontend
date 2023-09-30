import React, { useEffect, useState } from "react";
import './newReport.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReport } from "../../../Store/reportSlice";

function NewReport() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newId, setNewId ] = useState(0);
    const users = useSelector((state) => state.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const reports = useSelector((state) => state.reports);
    const projects = useSelector((state) => state.projects);



    const location = useLocation();

    const reportDetails = [
        'Id',
        'Title',
        'Type',
        'Status',
        'Priority',
        'Project',
        'Submitter',
        'Developer',
        'Created',
        'Description',        
    ];

    const newReport = {
        id: newId,
        title: inputValues['Title'] || '',
        type: inputValues['Type'] || '',
        status: inputValues['Status'] || '',
        priority: inputValues["Priority"] || '',
        submitter: inputValues['Submitter'] || '',
        project: inputValues['Project'] || '',
        developer: inputValues['Developer'] || '',
        created: currentDate,
        description: inputValues['Description'] || '',
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

    const handleSaveNewReport = (event) => {
        event.preventDefault();

        dispatch(addReport(newReport));

        alert('New report was created!')

        setInputValues({});
        navigate(`/reports/${newReport.id}`)
    }

    useEffect(() => {
        handleCurrentDate();
        if (reports && reports.length > 0) {
          const highestId = Math.max(...reports.map((report) => report.id), 0);
          setNewId(highestId + 1);
        } else {
          setNewId(1);
        }
    }, []);


    return (
        <section className="new-report">
            <div className="new-report-container">
                <div className="new-report-title">New Report</div>
                <form className="new-report-form">
                    {reportDetails.map((detail) => (
                        <div key={detail} className="new-report-details">
                            <div className="new-report-detail">{detail}:</div>
                                {detail === 'Id' ? (
                                <div className="new-report-input id">Report-{newId}</div>
                            ) : detail === 'Type' ? (
                                <select className='new-report-input' value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a type...</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Crash">Crash</option>
                                    <option value="Task">Task</option>               
                                </select>
                            ) : detail === 'Status' ? (
                                <select className='new-report-input' value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a status...</option>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Postponed">Postponed</option>
                                    <option value="Closed">Closed</option>                
                                </select>
                            ) : detail === 'Priority' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value=''>Select a priority level...</option>
                                    <option value='Critical'>Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            ) : detail === 'Project' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a project...</option>
                                    {projects.map((project, index) => (
                                        <option key={index} value={`${project.title}`}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Submitter' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Submitter...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Developer' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Developer...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>
                            ) : detail === 'Created' ? (
                                <div className="new-report-input date">{currentDate}</div>          
                            ) : detail === 'Description' ? (
                                <textarea type="text" className="new-report-input description" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            ) : (
                                <input type="text" className="new-report-input text" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            )}                    
                        </div>
                    ))}
                </form>
                <div className="new-report-button">
                    <button onClick={handleSaveNewReport}>Create</button>
                </div>
            </div>
        </section>
    )
}

export default NewReport;