import React from 'react';
import styles from "./subject.module.scss";

const Subject = ({ subject, cabinet, teacher, isToday }) => {
    return (
        <div className={`${styles.subject} ${isToday ? styles.subject_today : ''}`}>
            <span className={styles.subject__title}>{subject}</span>

            <div className={styles.subject__bottom}>
                <span className={styles.subject__cabinet}>{cabinet}</span>

                <span className={styles.subject__teacher}>{teacher}</span>
            </div>
        </div>
    );
};

export default Subject;
