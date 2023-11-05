import React, { useState } from "react";
import './searchSelect.scss';

function SearchSelect({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const options = [
    { value: "all", label: "All" },
    { value: "users", label: "Users" },
    { value: "projects", label: "Projects" },
    { value: "issues", label: "Issues" },
    { value: "reports", label: "Reports" },
  ];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="search-select">
      <div className="selected-option" onClick={toggleOptions} style={{ border: `1px solid ${theme.border}`, background: theme.background_color, color: theme.font_color}} >
        {options.find((option) => option.value === selectedOption).label} {<i className='bx bx-chevron-down down-icon'></i>}
      </div>
      {isOpen && (
        <div className="overlay">
            <div className="options-popup" style={{ background: theme.background_color, border: `1px solid ${theme.border}`, color: theme.font_color }}>
                <ul>
                    {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => handleOptionClick(option.value)}
                        className="search-option"
                        style={{ color: theme.font_color }}
                    >
                        {option.label}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      )}
    </div>
  );
}

export default SearchSelect;
