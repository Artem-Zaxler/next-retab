import React, { useState } from 'react';
import Subject from '../Subject/Subject';
import styles from "./day.module.scss";

export default function Day ({ day, subjects }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.day}>
            <div className={styles.day__panel} onClick={toggleOpen} style={{ cursor: 'pointer' }}>
                <span className={styles.day__title}>{day}</span>

                <img
                    src={'/svg/arrow.svg'}
                    alt={'arrow'}
                    className={styles.day__arrow}
                    style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                />
            </div>

            {isOpen && (
                <div>
                    {subjects.map((item, idx) => (
                        <Subject key={idx} subject={item.subject} cabinet={item.cabinet} teacher={item.teacher} />
                    ))}
                </div>
            )}
        </div>
    );
};
