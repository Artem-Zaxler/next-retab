import React from 'react';

const SubFilters = ({ filters, selectedFilter, selectedSubFilter, handleSubFilterClick, subFilters }) => {
    if (selectedFilter === null || selectedFilter >= filters.length) return null;

    return (
        <div className="sub-filters">
            <select
                value={selectedSubFilter || ''}
                onChange={(e) => handleSubFilterClick(e.target.value)}
                className="sub-filters__dropdown"
            >
                <option value="" disabled>Выберите подфильтр</option>
                {subFilters && subFilters.map((subFilter, index) => (
                    <option key={index} value={subFilter}>
                        {subFilter}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SubFilters;
