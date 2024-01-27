import React, { useEffect, useState } from "react";
import "./reports.scss";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { sortByProperty } from "../../utils";
import ReportsSort from "./Reports Sort/reportsSort";
import ReportsTable from "./Reports Table/reportsTable";
import TablePagination from "../../Charts & Tables/Table Pagination/tablePagination";
import { selectAllReports } from "./reportSlice";
import { selectViewMode } from "../Layout/viewModeSlice";
import { selectTheme } from "../Users/User/Settings/settingsSlice";

function Reports() {
  const viewMode = useSelector(selectViewMode);
  const location = useLocation();
  const isReportsActive = location.pathname === "/reports";
  const reports = useSelector(selectAllReports);
  const theme = useSelector(selectTheme);


  const sortedReportsByCreated = [...reports].sort(
    sortByProperty("created", null, true)
  );
  const sortedReportsByProject = [...reports].sort(
    sortByProperty("project", null, true)
  );
  const sortedReportsBySubmitter = [...reports].sort(
    sortByProperty("subject", null, true)
  ).reverse();
  const sortedReportsByType = [...reports].sort(
    sortByProperty("type", null, true)
  );

  const [rotate, setRotate] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  const handleRotate = () => {
    setRotate(!rotate);
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const [sortOrder, setSortOrder] = useState("ascending");

  const getSortingFunction = () => {
    switch (selectedSort) {
      case "Created":
        return sortOrder === "descending"
          ? sortedReportsByCreated
          : sortedReportsByCreated.reverse();
      case "Project":
        return sortOrder === "descending"
          ? sortedReportsByProject
          : sortedReportsByProject.reverse();
      case "Submitter":
        return sortOrder === "descending"
          ? sortedReportsBySubmitter
          : sortedReportsBySubmitter.reverse();
      case "Type":
        return sortOrder === "descending"
          ? sortedReportsByType
          : sortedReportsByType.reverse();
      default:
        return sortOrder === "descending"
          ? sortedReportsByCreated
          : sortedReportsByCreated.reverse();
    }
  };

  const sortedReports = getSortingFunction();

  /* this is the break from list view to tile view */

  const [typeRotate, setTypeRotate] = useState(false);
  const [descriptionRotate, setDescriptionRotate] = useState(false);
  const [subjectRotate, setSubjectRotate] = useState(false);
  const [projectRotate, setProjectRotate] = useState(false);
  const [submitterRotate, setSubmitterRotate] = useState(false);
  const [createdRotate, setCreatedRotate] = useState(false);
  const [typeColumnActive, setTypeColumnActive] = useState(false);
  const [descriptionColumnActive, setDescriptionColumnActive] = useState(false);
  const [subjectColumnActive, setSubjectColumnActive] = useState(false);
  const [projectColumnActive, setProjectColumnActive] = useState(false);
  const [submitterColumnActive, setSubmitterColumnActive] = useState(false);
  const [createdColumnActive, setCreatedColumnActive] = useState(false);

  const handleActiveColumn = (column) => {
    if (column === "type") {
      setTypeColumnActive(true);
      setDescriptionColumnActive(false);
      setSubjectColumnActive(false);
      setProjectColumnActive(false);
      setSubmitterColumnActive(false);
      setCreatedColumnActive(false);
      setTypeRotate(!typeRotate);
      setSelectedSort("Type");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    if (column === "description") {
      setTypeColumnActive(false);
      setDescriptionColumnActive(true);
      setSubjectColumnActive(false);
      setProjectColumnActive(false);
      setSubmitterColumnActive(false);
      setCreatedColumnActive(false);
      setDescriptionRotate(!descriptionRotate);
      setSelectedSort("Description");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    if (column === "subject") {
      setTypeColumnActive(false);
      setDescriptionColumnActive(false);
      setSubjectColumnActive(true);
      setProjectColumnActive(false);
      setSubmitterColumnActive(false);
      setCreatedColumnActive(false);
      setSubjectRotate(!subjectRotate);
      setSelectedSort("Subject");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    if (column === "project") {
      setTypeColumnActive(false);
      setDescriptionColumnActive(false);
      setSubjectColumnActive(false);
      setProjectColumnActive(true);
      setSubmitterColumnActive(false);
      setCreatedColumnActive(false);
      setProjectRotate(!projectRotate);
      setSelectedSort("Project");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    if (column === "submitter") {
      setTypeColumnActive(false);
      setDescriptionColumnActive(false);
      setSubjectColumnActive(false);
      setProjectColumnActive(false);
      setSubmitterColumnActive(true);
      setCreatedColumnActive(false);
      setSubmitterRotate(!submitterRotate);
      setSelectedSort("Submitter");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    if (column === "created") {
      setTypeColumnActive(false);
      setDescriptionColumnActive(false);
      setSubjectColumnActive(false);
      setProjectColumnActive(false);
      setSubmitterColumnActive(false);
      setCreatedColumnActive(true);
      setCreatedRotate(!createdRotate);
      setSelectedSort("Created");
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage < pageCount) {
      setCurrentPage(newPage);
    }
  };

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageCount = Math.ceil(sortedReports.length / itemsPerPage);

  const slicedReports = sortedReports
    .map((report, index) => {
      const firstPageIndex = (currentPage - 1) * itemsPerPage;
      const lastPageIndex = firstPageIndex + itemsPerPage;
      if (index >= firstPageIndex && index < lastPageIndex) {
        return report;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <>
      {viewMode === "list" ? (
        <section
          className="reports reports-list"
          style={{ color: theme.font_color }}
        >
          <div className={`reports-title ${!isReportsActive ? "active" : ""}`}>
            Reports
          </div>

          <div className="reports-container">
            <div
              className="all-reports-table-container"
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.primary_color,
              }}
            >
              <div className="reports-table-content">
                <table>
                  <thead>
                    <tr>
                      <th
                        value="type"
                        className={`type-column ${
                          typeColumnActive ? "active" : ""
                        }`}
                        onClick={() => handleActiveColumn("type")}
                      >
                        Type{" "}
                        <i
                          className={`bx bx-down-arrow ${
                            typeRotate ? "rotate" : ""
                          } ${typeColumnActive ? "active" : ""}`}
                          onClick={() => handleActiveColumn("type")}
                        ></i>
                      </th>
                      <th
                        value="subject"
                        className={`subject-column ${
                          subjectColumnActive ? "active" : ""
                        }`}
                        onClick={() => handleActiveColumn("subject")}
                      >
                        Subject{" "}
                        <i
                          className={`bx bx-down-arrow ${
                            subjectRotate ? "rotate" : ""
                          } ${subjectColumnActive ? "active" : ""}`}
                          onClick={() => handleActiveColumn("subject")}
                        ></i>
                      </th>
                      <th
                        value="project"
                        className={`project-column ${
                          projectColumnActive ? "active" : ""
                        }`}
                        onClick={() => handleActiveColumn("project")}
                      >
                        Project{" "}
                        <i
                          className={`bx bx-down-arrow ${
                            projectRotate ? "rotate" : ""
                          } ${projectColumnActive ? "active" : ""}`}
                          onClick={() => handleActiveColumn("project")}
                        ></i>
                      </th>
                      {isReportsActive && (
                        <th
                          value="description"
                          className={`description-column ${
                            descriptionColumnActive ? "active" : ""
                          }`}
                          onClick={() => handleActiveColumn("description")}
                        >
                          Description{" "}
                          <i
                            className={`bx bx-down-arrow ${
                              descriptionRotate ? "rotate" : ""
                            } ${descriptionColumnActive ? "active" : ""}`}
                            onClick={() => handleActiveColumn("description")}
                          ></i>
                        </th>
                      )}
                      {isReportsActive && (
                        <th
                          value="submitter"
                          className={`submitter-column ${
                            submitterColumnActive ? "active" : ""
                          }`}
                          onClick={() => handleActiveColumn("submitter")}
                        >
                          Submitter{" "}
                          <i
                            className={`bx bx-down-arrow ${
                              submitterRotate ? "rotate" : ""
                            } ${submitterColumnActive ? "active" : ""}`}
                            onClick={() => handleActiveColumn("submitter")}
                          ></i>
                        </th>
                      )}
                      {isReportsActive && (
                        <th
                          value="created"
                          className={`created-column ${
                            createdColumnActive ? "active" : ""
                          }`}
                          onClick={() => handleActiveColumn("created")}
                        >
                          Created{" "}
                          <i
                            className={`bx bx-down-arrow ${
                              createdRotate ? "rotate" : ""
                            } ${createdColumnActive ? "active" : ""}`}
                            onClick={() => handleActiveColumn("created")}
                          ></i>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="reports-table-body">
                    {slicedReports.map((report, index) => (
                      <ReportsTable
                        report={report}
                        key={index}
                        index={index}
                        isReportsActive={isReportsActive}
                        theme={theme}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="reports-table-pagination">
                <TablePagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  onPageChange={handlePageChange}
                  totalCount={sortedReports.length}
                  items={sortedReports}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  pageCount={pageCount}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="reports reports-tile">
          <ReportsSort
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            rotate={rotate}
            handleRotate={handleRotate}
            theme={theme}
          />

          <div
            className={`reports-container ${isReportsActive ? "active" : ""}`}
          >
            {sortedReports.map((report) => (
              <Link
                className={`report-link ${isReportsActive ? "active" : ""}`}
                to={`/reports/${report._id}`}
                key={report._id}
              >
                <div
                  className="report-container"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: theme.primary_color,
                    color: theme.font_color,
                  }}
                >
                  <div className="report-title">{report.subject}</div>
                  <div className="report-contents">
                    {Object.entries(report)
                      .filter(
                        ([key]) => !["attachments", "_id", "description", "subject", "comments", "__v"].includes(key)
                      )
                      .map(([key, value]) => (
                        <div className="report-name" key={key}>
                          <div className="report-left">{key}:</div>
                          <div className="report-right">{value}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Reports;
