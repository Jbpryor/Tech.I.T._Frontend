import React from 'react';
import './issues.scss'
import Issue from '../Issue/issue';
import { issues } from '../Issue/issue'

function Issues() {
    return (
        <section className="issues">
            <div className="issues-container">
                {issues.map((issue, index) => (
                    <Issue key={index} issue={issue} />
                ))}
            </div>
        </section>
    )
}

export default Issues;