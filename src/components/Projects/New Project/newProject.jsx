import React, { useEffect, useState } from "react";
import './newProject.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../../../Store/Slices/projectSlice";

function NewProject() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newId, setNewId ] = useState(0);
    const users = useSelector((state) => state.users)
    const [ inputValues, setInputValues ] = useState({});
    const [ currentDate, setCurrentDate ] = useState('');
    const projects = useSelector((state) => state.projects);

    const location = useLocation();

    const projectDetails = [
        'Id',
        'Title',
        'Type',
        'Manager',
        'Frontend',
        'Backend',
        'Client Name',
        'Created',
        'Description',        
    ];

    const newProject = {
        id: newId,
        title: inputValues['Title'] || '',
        type: inputValues['Type'] || '',
        manager: inputValues['Manager'] || '',
        frontend: inputValues["Frontend"] || '',
        backend: inputValues['Backend'] || '',
        clientName: inputValues['Client Name'] || '',
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

    const handleSaveNewProject = (event) => {
        event.preventDefault();

        dispatch(addProject(newProject));

        alert('New project was created!')

        setInputValues({});
        navigate(`/projects/${newProject.id}`)
    }

    useEffect(() => {
        handleCurrentDate();
        if (projects && projects.length > 0) {
          const highestId = Math.max(...projects.map((project) => project.id), 0);
          setNewId(highestId + 1);
        } else {
          setNewId(1);
        }
    }, []);


    return (
        <section className="new-project">
            <div className="new-project-container">
                <div className="new-project-title">New Project</div>
                <form className="new-project-form">
                    {projectDetails.map((detail) => (
                        <div key={detail} className="new-project-details">
                            <div className="new-project-detail">{detail}:</div>
                                {detail === 'Id' ? (
                                <div className="new-project-input id">Project-{newId}</div>
                            ) : detail === 'Manager' ? (
                                <select className="new-project-input" value={projectDetails[detail]} onChange={(event) => handleInputChange(event, detail)}>
                                    <option value="">Select a Manager...</option>
                                    {users.map((user, index) => user.role === 'Project Manager' && (
                                        <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                            {user.name.first} {user.name.last}
                                        </option>
                                    ))}
                                </select>
                            ) : detail === 'Created' ? (
                                <div className="new-project-input date">{currentDate}</div>          
                            ) : detail === 'Description' ? (
                                <textarea type="text" className="new-project-input description" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            ) : (
                                <input type="text" className="new-project-input text" placeholder={` Enter ${detail}...`} value={inputValues[detail] || ''} onChange={(event) => handleInputChange(event, detail)} />
                            )}                    
                        </div>
                    ))}
                </form>
                <div className="new-project-button">
                    <button onClick={handleSaveNewProject}>Create</button>
                </div>
            </div>
        </section>
    )
}

export default NewProject;