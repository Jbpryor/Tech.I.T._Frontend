import React, { useEffect, useState } from "react";
import './newReport.scss';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReport } from "../../../Store/Slices/reportSlice";

function NewReport() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newId, setNewId ] = useState(0);
    const users = useSelector((state) => state.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const reports = useSelector((state) => state.reports);
    const projects = useSelector((state) => state.projects);

    const reportDetails = [
        'Created',
        'Subject',
        'Type',
        'Submitter',
        'Project',        
        'Description',        
    ];

    const newReport = {
        id: newId,
        subject: inputValues['Subject'] || '',
        type: inputValues['Type'] || '',
        submitter: inputValues['Submitter'] || '', /* this needs to be set to the logged in user */
        project: inputValues['Project'] || '',
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
                            {detail === 'Type' ? (
                                <select className='new-report-input' value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Type...</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Crash">Crash</option>
                                    <option value="Task">Task</option>               
                                </select>
                            ) : detail === 'Project' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Project...</option>
                                    {projects.map((project, index) => (
                                        <option key={index} value={`${project.title}`}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Submitter' ? (
                                <select className="new-report-input" value={reportDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Submitter...</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>  
                            ) : detail === 'Created' ? (
                                <div className="new-report-input date">{currentDate}</div>          
                            ) : detail === 'Description' ? (
                                <textarea type="text" className="new-report-input description" placeholder={` Enter a detailed ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
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