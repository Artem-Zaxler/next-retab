import React from 'react';
import Select from 'react-select';
import styles from "./SubFilters.module.scss";

const SubFilters = ({ filters, selectedFilter, selectedSubFilter, handleSubFilterClick, subFilters }) => {
    if (selectedFilter === null || selectedFilter >= filters.length) return null;

    const options = subFilters ? subFilters.map(subFilter => ({ value: subFilter, label: subFilter })) : [];

    return (
        <div className={styles.subFilters}>
            <Select
                value={options.find(option => option.value === selectedSubFilter) || null}
                onChange={(selectedOption) => handleSubFilterClick(selectedOption ? selectedOption.value : '')}
                options={options}
                placeholder="Выберите подфильтр"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                })}
            />
        </div>
    );
};

export default SubFilters;
