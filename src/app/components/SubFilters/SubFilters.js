import React from 'react';
import Select from 'react-select';
import styles from "./SubFilters.module.scss";
import "./react-select.css";

const SubFilters = ({ filters, selectedFilter, selectedSubFilter, handleSubFilterClick, subFilters }) => {
    if (selectedFilter === null || selectedFilter >= filters.length) return null;

    const options = subFilters ? subFilters.map(subFilter => ({ value: subFilter, label: subFilter })) : [];

    return (
        <div className="sub-filters">
            <Select
                value={options.find(option => option.value === selectedSubFilter) || null}
                onChange={(selectedOption) => handleSubFilterClick(selectedOption ? selectedOption.value : '')}
                options={options}
                placeholder="Выберите подфильтр"
                className="sub-filters__dropdown"
            />
        </div>
    );
};

export default SubFilters;
