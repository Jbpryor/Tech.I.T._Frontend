import React from "react";
import "./issueModifications.scss";
import { formatTimestamp } from "../../../../utils";

function IssueModifications({ issue, theme, smallerScreen }) {
  const modifications = issue.modifications;

  return (
    <div
      className="mod-content"
      style={{
        borderBottom: `2px solid ${theme.border}`,
        color: theme.font_color,
        background: theme.primary_color,
      }}
    >
      {smallerScreen ? (
        <div
          className="headers"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          <div className="title">Title</div>
          <div className="previous">Prev</div>
          <div className="current">Curr</div>
          <div className="modified">Mod</div>
        </div>
      ) : (
        <div
          className="headers"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          <div className="title">Title</div>
          <div className="previous">Previous</div>
          <div className="current">Current</div>
          <div className="modified">Modified</div>
        </div>
      )}
      {modifications.map((modification, index) => (
        <div key={index}>
          {Object.entries(modification).map(([key, value]) => (
            <div
              key={key}
              className="mods"
              style={{ borderBottom: `1px solid ${theme.border}` }}
            >
              <div className="mod-title">{modification.type}</div>
              <div className="mod-value">{modification.previousState}</div>
              <div className="mod-value">{modification.currentState}</div>
              <div className="mod-value">{formatTimestamp(modification.modified)}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default IssueModifications;
