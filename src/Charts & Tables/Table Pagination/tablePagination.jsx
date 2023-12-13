import React, { useState } from 'react';
import './tablePagination.scss'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../components/Users/User/Settings/settingsSlice';

function TablePagination({ currentPage, setCurrentPage, onPageChange, items, itemsPerPage, setItemsPerPage }) {

  const theme = useSelector(selectTheme);

  const [pageNumber, setPageNumber] = useState(currentPage);
  const totalItems = Math.ceil(items.length);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage - 1, totalItems - 1);

  const [selectPage, setSelectPage] = useState(null);
  const itemsPerPageOptions = [10, 20, 50, 100, 200, 500, 100];

  const pageOptionFiltered = itemsPerPageOptions.filter((option) => option <= totalItems)

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    if (!isNaN(newItemsPerPage) && newItemsPerPage > 0) {
      setItemsPerPage(newItemsPerPage);
      const newPage = Math.floor(startIndex / newItemsPerPage);
      onPageChange(newPage);
    }
  };

  const handlePageSelection = (page) => {
    setSelectPage(page);
    setPageNumber(page + 1);
  };

  const handlePageChange = (event) => {
    const inputPageNumber = parseInt(event.target.value, 10);
    if (!isNaN(inputPageNumber) && inputPageNumber >= 1) {
      setPageNumber(inputPageNumber);
    }
  };

  const handlePageEnter = (event) => {
    if (event.key === 'Enter') {
      const newPage = pageNumber - 1;
      if (newPage >= 0 && newPage < totalItems) {
        onPageChange(newPage);
        setSelectPage(null);
      }
    }
  };

  const renderPageNumber = () => {
    const buttons = [];

    for (let i = 0; i < Math.ceil(items.length / itemsPerPage); i++) {
      buttons.push(
        <div className='page-number' key={i} onClick={() => setCurrentPage(i + 1)} style={{ background: theme.background_color, color: theme.font_color }} >
          {i + 1}
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-content">
      <div className="pagination-pages">
        <select className={`items-per-page ${totalItems <= 10 ? 'none' : ''}`} value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ background: theme.primary_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >
          {pageOptionFiltered.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="page-info" style={{ background: theme.primary_color, color: theme.font_color }}>
          Showing {startIndex + 1} - {Math.min(endIndex + 1, totalItems)} of {totalItems}
        </div>
      </div>
      <div className="pagination-buttons">
        <button className='page-button-left' onClick={() => onPageChange(setCurrentPage(currentPage - 1))} disabled={currentPage === 1} style={{ background: theme.background_color, color: theme.font_color }} >
          <i className='bx bx-left-arrow'></i>
        </button>
        {selectPage === null ? (
          renderPageNumber()
        ) : (
          <input
            className='page-input'
            type="number"
            value={pageNumber}
            onChange={handlePageChange}
            onKeyDown={handlePageEnter}
            onBlur={() => setSelectPage(null)}
            style={{ background: theme.background_color, color: theme.font_color }}
          />
        )}
        <button className='page-button-right' onClick={() => onPageChange(setCurrentPage(currentPage + 1))} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)} style={{ background: theme.background_color, color: theme.font_color }} >
          <i className='bx bx-right-arrow'></i>
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
