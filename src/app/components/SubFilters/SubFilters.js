import React from 'react';
import styles from './SubFilters.module.scss';

const SubFilters = ({filters, selectedFilter, selectedSubFilter, handleSubFilterClick}) => {
    return (
        <div className={styles.subFilters}>
            {filters[selectedFilter].subFilters.map((subFilter, j) => (
                <button
                    key={j}
                    className={`${styles.subFilters__button} 
                    ${selectedSubFilter === subFilter ? 
                        styles.subFilters__button_active : 
                        styles.subFilters__button_inactive}`}
                    onClick={() => handleSubFilterClick(subFilter)}
                >
                    {subFilter}
                </button>
            ))}
        </div>
    );
};

export default SubFilters;
