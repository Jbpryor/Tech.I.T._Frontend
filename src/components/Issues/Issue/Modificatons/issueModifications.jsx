import React from "react";
import './issueModifications.scss'
import { useSelector } from "react-redux";
import { formatTimestamp } from "../../../../main";

function IssueModifications({ issue }) {
    const modifications = issue.modifications;

    return (
        <div className="mod-content">
            <div className="headers">
                <div className="title">title</div>
                <div className="previous">Previous</div>
                <div className="current">Current</div>
                <div className="modified">Modified</div>
            </div>
            {modifications.map((modification, index) => (
                <div key={index}>
                    {Object.entries(modification).map(([key, value]) => (
                        <div key={key} className="mods">
                            <div className="mod-title">{key}</div>
                            <div className="mod-value">{value.previousState}</div>
                            <div className="mod-value">{value.currentState}</div>
                            <div className="mod-value">{formatTimestamp(value.modified)}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default IssueModifications;
