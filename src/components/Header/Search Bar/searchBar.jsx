import React, { useState } from "react";
import SearchSelect from "./Search Select/searchSelect";
import { useSelector } from "react-redux";

function SearchBar({
  isSearchIconVisible,
  setSearchIconVisible,
  theme,
  smallerScreen,
}) {
  const [search, setSearch] = useState("");
  const [resultsActive, setResultsActive] = useState(false);
  const [selectedData, setSelectedData] = useState("all");

  const reports = useSelector((state) => state.reports);
  const projects = useSelector((state) => state.projects);
  const users = useSelector((state) => state.users);
  const issues = useSelector((state) => state.issues);

  const filteredReports = {};
  Object.entries(reports).forEach(([report, value]) => {
    filteredReports[report] = value.subject;
  });

  const filteredProjects = {};
  Object.entries(projects).forEach(([project, value]) => {
    filteredProjects[project] = value.title;
  });

  const filteredUsers = {};
  Object.entries(users).forEach(([user, value]) => {
    filteredUsers[user] = value.name.first + " " + value.name.last;
  });

  const filteredIssues = {};
  Object.entries(issues).forEach(([issue, value]) => {
    filteredIssues[issue] = value.title;
  });

  const allData = {
    filteredReports,
    filteredProjects,
    filteredUsers,
    filteredIssues,
  };

  function recursiveSearch(obj, search) {
    const results = [];

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        results.push(...recursiveSearch(value, search));
      } else {
        const keyWords = key.toLowerCase().split(" ");
        const valueWords = value && value.toString().toLowerCase().split(" ");

        if (
          keyWords.some((word) => word.startsWith(search.toLowerCase())) ||
          (valueWords &&
            valueWords.some((word) => word.startsWith(search.toLowerCase())))
        ) {
          results.push({ key, value });
        }
      }
    }

    return results;
  }

  const searchResults = [];

  if (selectedData === "all") {
    for (const [dataSetName, dataSet] of Object.entries(allData)) {
      const dataSetResults = recursiveSearch(dataSet, search);
      for (const { key, value } of dataSetResults) {
        searchResults.push({ dataSetName, key, value });
      }
    }
  } else if (selectedData === "reports") {
    const dataSetResults = recursiveSearch(filteredReports, search);
    for (const { key, value } of dataSetResults) {
      searchResults.push({ key, value });
    }
  } else if (selectedData === "projects") {
    const dataSetResults = recursiveSearch(filteredProjects, search);
    for (const { key, value } of dataSetResults) {
      searchResults.push({ key, value });
    }
  } else if (selectedData === "users") {
    const dataSetResults = recursiveSearch(filteredUsers, search);
    for (const { key, value } of dataSetResults) {
      searchResults.push({ key, value });
    }
  } else if (selectedData === "issues") {
    const dataSetResults = recursiveSearch(filteredIssues, search);
    for (const { key, value } of dataSetResults) {
      searchResults.push({ key, value });
    }
  }

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
        {searchResults.map((result) => (
          <div className="search-results">{result.value}</div>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
