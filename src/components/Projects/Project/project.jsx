import React from "react";
import './project.scss';
import User from '../../Users/User/user'


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
                <User />
            </div>
        </section>
    );
}

export default Project;

// need to add a status field that contains issues
// resolved to unresolved