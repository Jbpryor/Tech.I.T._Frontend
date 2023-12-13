import React, { useState } from "react";
import SearchSelect from "./Search Select/searchSelect";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../../Users/userSlice";
import { selectAllIssues } from "../../Issues/issueSlice";
import { selectAllProjects } from "../../Projects/projectSlice";
import { selectAllReports } from "../../Reports/reportSlice";

function SearchBar({
  isSearchIconVisible,
  setSearchIconVisible,
  theme,
  smallerScreen,
}) {
  const [search, setSearch] = useState("");
  const [resultsActive, setResultsActive] = useState(false);
  const [selectedData, setSelectedData] = useState("all");

  const reports = useSelector(selectAllReports);
  const projects = useSelector(selectAllProjects);
  const users = useSelector(selectAllUsers);
  const issues = useSelector(selectAllIssues);

  const allData = {
    reports,
    projects,
    users,
    issues,
  };

  const allDataValues = [];

  for (const field in allData) {
    const data = allData[field];

    for (const key in data) {
      const value = data[key];

      if (
        field === "reports" &&
        value.subject.toLowerCase().includes(search.toLowerCase())
      ) {
        allDataValues.push({
          id: value.id,
          value: value.subject,
          field: field,
        });
      } else if (
        (field === "projects" || field === "issues") &&
        value.title.toLowerCase().includes(search.toLowerCase())
      ) {
        allDataValues.push({ id: value.id, value: value.title, field: field });
      } else if (
        field === "users" &&
        (value.name.first + " " + value.name.last)
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        allDataValues.push({
          id: value.id,
          value: value.name.first + " " + value.name.last,
          field: field,
        });
      }
    }
  }

  const filteredData = allDataValues.filter((result) => {
    if (selectedData === "all") {
      return true;
    } else {
      return result.field === selectedData;
    }
  });

  const handleSelectChange = (event) => {
    setSelectedData(event.target.value);
  };

  const handleSearchIconClick = () => {
    setSearchIconVisible(false);
  };

  const handleCancelSearch = () => {
    setSearchIconVisible(true);
    setResultsActive(false);
  };

  return (
    <>
      <div
        className={`search-container ${isSearchIconVisible ? "" : "active"}`}
      >
        {isSearchIconVisible ? (
          <div className="icon-container">
            <i
              className="bx bx-search-alt-2 search-icon"
              onClick={handleSearchIconClick}
            ></i>
          </div>
        ) : (
          <div className="search-bar">
            {smallerScreen ? (
              <SearchSelect theme={theme} />
            ) : (
              <select
                className="search-select"
                name=""
                id=""
                value={selectedData}
                onChange={handleSelectChange}
                style={{
                  background: theme.background_color,
                  color: theme.font_color,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {/* this needs to be set as the key of the map */}
                <option className="search-option" value="all">
                  All
                </option>
                <option className="search-option" value="users">
                  Users
                </option>
                <option className="search-option" value="projects">
                  Projects
                </option>
                <option className="search-option" value="issues">
                  Issues
                </option>
                <option className="search-option" value="reports">
                  Reports
                </option>
              </select>
            )}

            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                setSearch(event.target.value);
                setResultsActive(event.target.value !== "");
              }}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `2px solid ${theme.border}`,
              }}
            />
            <button
              className="cancel-search-button"
              onClick={handleCancelSearch}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div
        className={`search-results-container ${resultsActive ? "active" : ""}`}
        style={{ background: theme.primary_color, color: theme.font_color }}
      >
        {filteredData
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.value
                  .toLowerCase()
                  .split(" ")
                  .some((word) => word.startsWith(search.toLowerCase()));
          })
          .map((result, index) => (
            <Link
              to={`/${result.field}/${result.id}`}
              key={index}
              className="search-link"
              onClick={handleCancelSearch}
              style={{color: theme.font_color}}
            >
              <div className="search-results">{result.value}</div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default SearchBar;
