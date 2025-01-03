'use client';

import React, {useEffect, useState} from 'react';
import Subject from '../Subject/Subject';
import styles from "./day.module.scss";

export default function Day({day, subjects, isCurrentDay, showAllDays}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (showAllDays || isCurrentDay) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [showAllDays, isCurrentDay]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    let dayName;
    switch (day) {
        case "Monday":
            dayName = 'Понедельник';
            break;
        case "Tuesday":
            dayName = 'Вторник';
            break;
        case "Wednesday":
            dayName = 'Среда';
            break;
        case "Thursday":
            dayName = 'Четверг';
            break;
        case "Friday":
            dayName = 'Пятница';
            break;
        case "Saturday":
            dayName = 'Суббота';
            break;
        default:
            dayName = day;
            break;
    }

    return (
        <div className={`${styles.day} ${isCurrentDay ? styles.day_current : ''}`}>
            <div className={styles.day__panel} onClick={toggleOpen}>
                <span className={styles.day__title}>{dayName}</span>

                <img
                    src={'/svg/arrow.svg'}
                    alt={'arrow'}
                    className={styles.day__arrow}
                    style={{transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}}
                />
            </div>

            {isOpen && (
                <>
                    <div className={styles.day__contentLine}></div>
                    <div className={styles.day__content}>
                        {subjects.length > 0 ? (
                            subjects.map((item, idx) => (
                                <Subject
                                    key={idx}
                                    subject={item.subject}
                                    cabinet={item.cabinet}
                                    teacher={item.teacher}
                                />
                            ))) : (
                            <span>Отдыхаем сегодня</span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
