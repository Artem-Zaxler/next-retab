import React from 'react';
import styles from './FilterButtons.module.scss';

const FilterButtons = ({ filters, activeStage, handleButtonClick, isAnimating }) => {
    const getButtonClassName = (i) => {
        if (activeStage === i) {
            return isAnimating ? styles.filterButtons__button_active_animated : styles.filterButtons__button_active;
        }
        return styles.filterButtons__button_inactive;
    };

    return (
        <div className={styles.filterButtons}>
            {filters.map((filter, i) => (
                <button
                    key={i}
                    className={`${styles.filterButtons__button} ${getButtonClassName(i)}`}
                    onClick={() => handleButtonClick(i)}
                >
                    {filter.text}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
