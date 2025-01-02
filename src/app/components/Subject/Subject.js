import React from 'react';
import styles from "./subject.module.scss";

export default function Subject ({ subject, cabinet, teacher }) {
    return (
        <div className={styles.subject}>
            <span className={styles.subject__title}>{subject}</span>

            <div className={styles.subject__bottom}>
                <span>{cabinet}</span>

                <span>{teacher}</span>
            </div>
        </div>
    );
};
