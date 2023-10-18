import React from "react";
import './issueModifications.scss'
import { formatTimestamp } from "../../../../main";

function IssueModifications({ issue, theme }) {
    const modifications = issue.modifications;

    return (
        <div className="mod-content" style={{ borderBottom: `2px solid ${theme.border}`, color: theme.font_color, background: theme.primary_color }} >
            <div className="headers" style={{ borderBottom: `1px solid ${theme.border}`}}>
                <div className="title">title</div>
                <div className="previous">Previous</div>
                <div className="current">Current</div>
                <div className="modified">Modified</div>
            </div>
            {modifications.map((modification, index) => (
                <div key={index}>
                    {Object.entries(modification).map(([key, value]) => (
                        <div key={key} className="mods" style={{ borderBottom: `1px solid ${theme.border}`}}>
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
