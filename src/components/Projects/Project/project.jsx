import React from "react";
import './project.scss';
import ProjectUsers from "../../Project Users/projectUsers";


function Project() {
    // const project = [
    //     {
    //         first: first,
    //         second: second,

    //     }
    // ]
    return (
        <section className="project">
            <div className="project-container">
                <div className="project-icon"></div>
                <div className="project-name"></div>
            </div>
            <div className="project-users">
                <ProjectUsers />
            </div>
        </section>
    );
}

export default Project;