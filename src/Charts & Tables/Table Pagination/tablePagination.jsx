import React, { useState } from 'react';

function TablePagination({ currentPage, pageCount, onPageChange }) {

  const [ selectPage, setSelectPage ] = useState(null);
  const [ pageNumber, setPageNumber ] = useState(currentPage + 1);

  const handlePageClick = (newPage) => {
    if (newPage >= 0 && newPage < pageCount) {
      onPageChange(newPage);
    }
  };

  const handlePageSelection = (page) => {
    setSelectPage(page);
    setPageNumber(page + 1);
  };

  const handlePageChange = (event) => {
    const inputPageNumber = parseInt(event.target.value, 10);
    if (!isNaN(inputPageNumber) && inputPageNumber >= 1 && inputPageNumber <= pageCount) {
      setPageNumber(inputPageNumber);
    }
  };

  const handlePageEnter = event => {
    if (event.key === 'Enter') {
      const newPage = pageNumber - 1;
      if (newPage >= 0 && newPage < pageCount) {
        onPageChange(newPage);
        setSelectPage(null);
      }
    }
  };

  const renderPageNumber = () => {
    const buttons = [];

    for (let i = 0; i < pageCount; i++) {
      buttons.push(
        <div className='page-number' key={i} onClick={() => handlePageSelection(i)}>
          {i + 1}
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-content">
      <div className="pagination-pages">

          <div className="page-info">
            Showing page {currentPage + 1} of {pageCount}
          </div>

      </div>
      <div className="pagination-buttons">

        <button className='page-button-left' onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 0}>
          <i className='bx bx-left-arrow' ></i>
        </button>

        {selectPage === null ? (
          renderPageNumber()
        ):(
          <input className='page-input' type="number" value={pageNumber} onChange={handlePageChange} onKeyDown={handlePageEnter} onBlur={() => setSelectPage(null)} />
        )}

        <button className='page-button-right' onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === pageCount - 1}>
          <i className='bx bx-right-arrow' ></i>
        </button>

      </div>
    </div>
  );
}

export default TablePagination;
