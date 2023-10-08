import React, { useEffect, useState } from 'react';
import './reports.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sortByProperty } from '../../main';
import ReportsSort from './Reports Sort/reportsSort';

function Reports() {
    const location = useLocation();
    const isReportsActive = location.pathname === '/reports';
    const reports = useSelector((state) => state.reports);

    const sortedReportsByCreated = [...reports].sort(sortByProperty('created', null, true));
    const sortedReportsByProject = [...reports].sort(sortByProperty('project', null, true));
    const sortedReportsBySubmitter = [...reports].sort(sortByProperty('subject', null, true));
    const sortedReportsByType = [...reports].sort(sortByProperty('type', null, true));


    const [ rotate, setRotate ] = useState(false);
    const [ selectedSort, setSelectedSort ] = useState('');

    const handleRotate = () => {
        setRotate(!rotate);
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    }

    const [sortOrder, setSortOrder] = useState('ascending');

    const getSortingFunction = () => {
        switch (selectedSort) {
            case 'Created':
                return sortOrder === 'ascending' ? sortedReportsByCreated : sortedReportsByCreated.reverse();
            case 'Project':
                return sortOrder === 'ascending' ? sortedReportsByProject : sortedReportsByProject.reverse();
            case 'Submitter':
                return sortOrder === 'ascending' ? sortedReportsBySubmitter : sortedReportsBySubmitter.reverse();
            case 'Type':
                return sortOrder === 'ascending' ? sortedReportsByType : sortedReportsByType.reverse();
            default:
                return sortOrder === 'ascending' ? sortedReportsByCreated : sortedReportsByCreated.reverse();
        }
      };
      
      
    const sortedReports = getSortingFunction();  
    
    
    
    return (
        <section className="reports">
            <div className={`reports-title ${isReportsActive ? 'active' : ''}`}>Reports</div>

            <ReportsSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} />

            <div className={`reports-container ${isReportsActive ? 'active' : ''}`}>              
            {sortedReports.map((report) => (
                <Link className='report-link' to={`/reports/${report.id}`} key={report.id}>
                    <div className={`report-container ${isReportsActive ? 'active' : ''}`}>       
                        <div className="report-title">{report.type}</div>
                        <div className="report-contents">
                            {Object.entries(report).filter(([key]) => !['id', 'description', 'type'].includes(key)).map(([key, value]) => (                
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
    )
}

export default Reports;