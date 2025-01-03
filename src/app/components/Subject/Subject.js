import React from 'react';
import styles from "./subject.module.scss";

export default function Subject ({ subject, cabinet, teacher, isToday }) {
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
